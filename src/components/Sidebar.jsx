import imglogo from "../assets/kirby2.png";
import SideBarButton from "./SidebarButton";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { useState, useEffect } from "react";
import apiClient from "../../spotify";

const Sidebar = () => {

  const [image, setImage] = useState(imglogo)

  const logout = () => {
    window.localStorage.removeItem("token");
    //recargar pagina
    window.location.reload(); 
  }

  useEffect(()=>{
    apiClient.get("/me").then((res)=>{
      setImage(res.data.images[0].url)
    })
  },[])

  return (
    <div className="w-[100px] h-[100vh] flex items-center flex-col justify-between py-5 px-1">
      <img src={image} className="w-[90px] h-[90px] rounded-xl" alt="" />
      <div>
        <SideBarButton title="Home" to="/feed" icons={<MdSpaceDashboard />}/>
        <SideBarButton title="Playlists" to="/addplaylist" icons={<FaGripfire />}/>
        <SideBarButton title="Player P" to="/player" icons={<FaPlay />}/>
        <SideBarButton title="Favorites" to="/favorites" icons={<MdFavorite />}/>
        <SideBarButton title="Library" to="/" icons={<IoLibrary />}/>
        
      </div>

      <SideBarButton title="Sign Out" logout={logout} icons={<FaSignOutAlt />}/>
    </div>
  );
};

export default Sidebar;
