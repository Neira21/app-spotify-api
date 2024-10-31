import { useState, useRef, useEffect } from "react";

// import icons of react-icons
import { FaPlay } from "react-icons/fa";
import { FaStop } from "react-icons/fa";
import { FaCirclePause } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";


import { toast } from "react-toastify";
import Toast from "../Toast";


import apiClient from "../../../spotify";

import PropTypes from "prop-types";



const Styles = {
  PlayerControls: {
    buttonPlay: "bg-green-500 text-white p-2 rounded-md flex items-center flex-col",
    buttonPause: "bg-yellow-500 text-white p-2 rounded-md flex items-center flex-col",
    buttonStop: "bg-red-500 text-white p-2 rounded-md flex items-center flex-col",
    progressBar: "w-[70%] block mx-auto bg-gray-200 rounded-lg mt-10",
    progress: "bg-blue-500 h-2 rounded-lg",
  },
};

const PlayerControls = ({ currentTrack, setIsPlaying }) => {
  PlayerControls.propTypes = {
    currentTrack: PropTypes.object.isRequired,
    setIsPlaying: PropTypes.func.isRequired,
  };

  //const notify = () => toast("Canción añadida a favoritos");

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


    // para añadir una canción a favoritos
    const addTrackToFavorites = (trackId) => {
      apiClient.put("/me/tracks", {
        ids: [trackId] // Pasa el ID de la canción en un array
      })
      .then(() => {
        toast.success("Canción añadida a favoritos"); // Mostrar toast aquí
      })
      .catch(error => {
        console.error("Error al añadir canción a favoritos:", error);
      });
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
    <div className="w-full flex flex-col overflow-auto ">
      <Toast />
      {currentTrack && <div className="mx-auto flex gap-5">
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
      {duration > 0 && (
        <div className="text-white text-center">
          {new Date(duration * 1000).toISOString().substr(14, 5)}
        </div>
      )}

      <div className="w-full flex justify-center items-center mt-5">
        {currentTrack && currentTrack.isLiked ? (
          <button className="text-white text-2xl">
            <GoHeartFill size={50} />
          </button>
        ) : (
          <button className="text-white text-2xl" onClick={()=>addTrackToFavorites(currentTrack.id)}>
            <GoHeart size={50} />
          </button>
        )}
      </div>
      
    </div>
  );
};

export default PlayerControls;
