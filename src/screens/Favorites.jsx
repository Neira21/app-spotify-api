import { useState, useEffect } from "react";
import apiClient from "../../spotify";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const getFavorites = async () => {
    try {
      const { data } = await apiClient.get("/me/tracks");
      console.log(data.items);
      setFavorites(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavorite = async (trackId) => {
    try {
      await apiClient.delete("/me/tracks", {
        data: {
          ids: [trackId],
        },
      });
      getFavorites();
    } catch (error) {
      console.log(error);
    }
  };

  const playTrack = (track) => {
    navigate("/player", { state: { track } });
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="screen-container overflow-auto">
      <div className="text-center text-[25px]">Lista de Favoritos</div>
      <div className="flex flex-wrap justify-start gap-7 my-5">
        {favorites.map((favorite) => (
          <div key={favorite.track.id}>
            <img
              src={favorite.track.album.images[0].url}
              alt={favorite.track.album.name}
              width={250}
            />
            <p>{favorite.track.name}</p>
            <div className="flex gap-2">
              <p>{favorite.track.artists[0].name}</p> -
              <p>{favorite.track.album.name}</p>
            </div>
            <button
              className="bg-black text-yellow-300 px-2 py-1 hover:bg-yellow-200 hover:text-black"
              onClick={() => playTrack(favorite.track)}
            >
              Play
            </button>
            <button
              className="bg-black text-yellow-300 px-2 py-1 hover:bg-yellow-200 hover:text-black ml-5"
              onClick={() => removeFavorite(favorite.track.id)}
            >
              Quitar de Favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
