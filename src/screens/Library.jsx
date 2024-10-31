//https://api.spotify.com/v1/albums

import { useEffect, useState } from "react";
import apiClient from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";

import { useNavigate } from "react-router-dom";

const Library = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const { data } = await apiClient.get("/me/playlists");
        setPlaylists(data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getAlbums();
  }, []);

  const navigate = useNavigate();

  const playPlayList = async (id) => {
    navigate(`/player`, { state: { id } });
  };

  const goaddPlayList = async (id, name) => {
    navigate(`/addplaylist`, { state: { id, name } });
  };

  return (
    <div className="screen-container">
      <div className="w-[100%] h-[94%] flex flex-wrap overflow-y-auto justify-start gap-5 mt-4">
        {playlists?.map((item) => {
          return (
            <div
              key={item?.id}
              className="px-8 w-[250px] flex flex-col justify-center items-center bg-gradient-to-tr from-[#28334e] to-[#4534b4] rounded-lg shadow-lg"
            >
              {item?.images?.[0]?.url ? (
                <img
                  src={item.images[0].url}
                  alt=""
                  className="w-40 h-40 rounded-lg cursor-pointer"
                  onClick={() => playPlayList(item?.id)}
                />
              ) : (
                <div className="w-40 h-40 rounded-lg bg-gray-500 flex items-center justify-center text-white">
                  No Image
                </div>
              )}
              <h1 className="text-white">{item?.name}</h1>
              <p className="text-gray-400">{item?.tracks?.total} songs</p>
              {/* flex-end */}
              <div className="flex justify-between w-full">
                <IconContext.Provider value={{ color: "blue", size: "50px"}}>
                  <RiAddCircleFill onClick={() => goaddPlayList(item?.id, item?.name)} className="cursor-pointer" />
                </IconContext.Provider>

                <IconContext.Provider value={{ color: "green", size: "50px" }}>
                  <AiFillPlayCircle onClick={() => playPlayList(item?.id)} className="cursor-pointer" />
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Library;
