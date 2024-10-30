/* eslint-disable */
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../spotify";

const Trending = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getTracks = () => {
    try {
      const playlistId = location.state?.id || "3tNP99ERm4kRAH781lig8T"; // Usa el ID del estado o uno por defecto
      apiClient.get(`/playlists/${playlistId}/tracks`).then((data) => {
        setTracks(data.data.items);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addPlaylist = (item) => {
    if (!location.state) return;
    apiClient
      .post(`/playlists/${location.state.id}/tracks`, {
        uris: [item.uri],
      })
      .then(() => {
        getTracks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getTracks();
  }, [location.state]);

  useEffect(() => {
    // si no hay state, redirigir a la página de Library
    if (!location.state) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const searchTrack = () => {
      if (search === "") return;
      apiClient.get(`/search?q=${search}&type=track`).then((data) => {
        setSearchResults(data.data.tracks.items);
      });
    };
    searchTrack();
  }, [search]);

  return (
    /* scroll y */
    <div className="screen-container overflow-y-auto">
      <h1 className="text-center text-[40px] my-5">Lista de Canciones</h1>

      <div className="w-full flex ">
        <h3 className="mr-20">Busque una canción para agregar a la lista</h3>
        <input
          type="text"
          className="text-black w-[20%]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {searchResults.length > 0 || (
        <h1 className="w-full text-center py-10">
          Busca una canción para añadirla a la playlist
        </h1>
      )}

      <div className="py-5 grid grid-cols-2 ">
        {searchResults?.map((item) => (
          <div key={item.id} className="flex justify-between mx-5">
            <div className="flex gap-4">
              <p>{item.name}</p> - <p>{item.artists[0].name}</p>
            </div>
            <button
              className="bg-black text-yellow-300 px-2 py-1 hover:bg-yellow-200 hover:text-black"
              onClick={() => addPlaylist(item)}
            >
              Agregar
            </button>
          </div>
        ))}
      </div>

      <hr />

      <div className="text-center text-[28px]">{location?.state?.name}</div>
      <div className="flex w-full justify-start flex-wrap gap-8">
        {tracks?.map((track) => {
          return (
            <div
              key={track.track.id}
              className="flex flex-col justify-between items-center"
            >
              <p className="text-[#c3d0e3] text-[20px] max-w-40 text-center">
                {track.track.name}
              </p>
              <img
                src={track.track.album.images[0].url}
                alt={track.track.name}
                width={200}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
