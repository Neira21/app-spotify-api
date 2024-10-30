import { useState, useRef, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import PropTypes from "prop-types";

const Styles = {
  PlayerControls: {
    buttonPlay: "bg-green-500 text-white p-2 rounded-md",
    buttonPause: "bg-yellow-500 text-white p-2 rounded-md",
    buttonStop: "bg-red-500 text-white p-2 rounded-md",
    progressBar: "w-[70%] block mx-auto bg-gray-200 rounded-lg mt-10",
    progress: "bg-blue-500 h-2 rounded-lg",
  },
};

const PlayerControls = ({ currentTrack, setIsPlaying }) => {
  PlayerControls.propTypes = {
    currentTrack: PropTypes.object.isRequired,
    setIsPlaying: PropTypes.func.isRequired,
  };

  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0); // Estado para el progreso del audio
  const [duration, setDuration] = useState(0); // Duración total del audio

  // Manejar reproducción de audio
  const handlePlay = () => {
    
    if (audioRef.current) {
      setIsPlaying(true);
      audioRef.current.play();
    }
    
  };

  // Pausar el audio
  const handlePause = () => {
    if (audioRef.current) {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  // Detener y reiniciar el audio
  const handleStop = () => {
    if (audioRef.current) {
      setIsPlaying(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  // Manejar cambio en el tiempo del audio
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    }
  };

  // Manejar el ajuste manual del progreso
  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    if (audioRef.current && duration > 0) {
      audioRef.current.currentTime = (newProgress / 100) * duration;
      setProgress(newProgress);
    }
  };

  // Obtener la duración total del audio cuando esté listo
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Actualizar solo la URL del audio cuando la pista cambie, sin reproducir automáticamente
  useEffect(() => {
    if (audioRef.current && currentTrack.preview_url) {
      audioRef.current.src = currentTrack.preview_url;
    }
  }, [currentTrack]);

  // Limpiar el audio cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full flex flex-col ">

      {currentTrack && <div className="mx-auto">
        <button
          className={Styles.PlayerControls.buttonPlay}
          onClick={handlePlay}
        >
          <FaPlay /> Play
        </button>
        <button
          className={Styles.PlayerControls.buttonPause}
          onClick={handlePause}
        >
          <FaCirclePause /> Pause
        </button>
        <button
          className={Styles.PlayerControls.buttonStop}
          onClick={handleStop}
        >
          <FaStop /> Stop
        </button>
      </div> }

      

      <div>
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress} // Evitar NaN
          onChange={handleProgressChange}
          className={Styles.PlayerControls.progressBar}
        />
      </div>

      <div>
        <audio
          ref={audioRef}
          src={currentTrack.preview_url ? currentTrack.preview_url : "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3"}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>
    </div>
  );
};

export default PlayerControls;
