/* eslint-disable */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../components/Player/SongCard";
import Queue from "../components/Player/Queue";
import PlayerControls from "../components/Player/PlayerControls";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // si no hay state, redirigir a la página de Library
    if (!location.state) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    try {
      if (location.state) {
        const { id } = location.state;
        apiClient.get(`/playlists/${id}/tracks`).then((data) => {
          setTracks(data.data.items);
          setCurrentTrack(data.data.items[0].track); // Inicializar con la primera pista
        });
      } else {
        apiClient
          .get(`/playlists/3tNP99ERm4kRAH781lig8T/tracks`)
          .then((data) => {
            setTracks(data.data.items);
            setCurrentTrack(data.data.items[0].track); // Inicializar con la primera pista
          });
      }
    } catch (error) {
      console.error(error);
    }
  }, [location.state]);

  return (
    <div className="screen-container flex">
      {/* left body */}
      <section className="w-[50%] mr-[2%] h-[100vh] text-white p-5 flex flex-col items-center">
        {/* Rotación en la imagen usando tailwind */}
        <img
          src="/disco.png"
          width={200}
          alt="disco-png"
          className={`
          w-[400px] h-[400px] rounded-full ${
            isPlaying ? "animate-spin-slow" : ""
          }
        `}
        />
        <div className="w-[100%] text-center text-[28px]">
          {currentTrack?.name}
        </div>
        <PlayerControls
          currentTrack={currentTrack}
          setIsPlaying={setIsPlaying}
        />
      </section>

      {/* right body */}
      <section className="w-[50%] h-[100%] flex flex-col justify-between gap-5 px-3">
        {
          // Si no hay currentTrack, no mostrar nada
          currentTrack ? <SongCard album={currentTrack.album} /> : <SongCard />
        }
        <Queue
          currentTrack={currentTrack}
          tracks={tracks}
          setCurrentTrack={setCurrentTrack}
        />
      </section>
    </div>
  );
};

export default Player;
