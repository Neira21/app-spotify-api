import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Library from "./Library"
import Feed from "./Feed"
import Player from "./Player"
import Favorites from "./Favorites"
import Trending from "./Trending"
import Sidebar from "../components/Sidebar"
import Login from "./Login"
import Error from "./Error"
import { useEffect, useState } from "react"
import { setClientToken } from "../../spotify"

const Home = () => {

  const [token, setToken] = useState("");

  useEffect(()=>{
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";

    if(!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    }else{
      setToken(token);
      setClientToken(token);
    }
    
  },[])



  return  !token ? <Login /> : (
    <Router>
      <div className="w-[100vw] h-[100vh] bg-blue-600 rounded-2xl flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library/>} />
          <Route path="/feed" element={<Feed/>} />
          <Route path="/player" element={<Player/>} />
          <Route path="/favorites" element={<Favorites/>} />
          <Route path="/addplaylist" element={<Trending/>} />
          {/* Error */}
          <Route path="*" element={<Error/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default Home