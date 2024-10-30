import PropType from "prop-types";
import Styles from "./AlbumInfo.module.css";
const AlbumInfo = ({ album }) => {
  AlbumInfo.propTypes = {
    album: PropType.object,
  };

  const artists = [];
  album?.artists?.map((artist) => {
    artists.push(artist.name);
  });

  return (
    <div className="mt-[20px] w-[65%]">
      <div className="font-extrabold text-[#c3d0e3] text-[20px] overflow-hidden">
        <div className={Styles.marquee}>
          <p className="my-[5px]">{album?.name + " - " + artists?.join(", ")}</p>
        </div>
      </div>

      <div className={`font-bold text-[15px] text-[#c3d0e3] ${Styles.albumInfo}`}>
        <p className="my-[5px]">{`${album?.name} is an ${
          album?.album_type
        } by ${artists?.join(", ")} with ${album?.total_tracks} track(s)`}</p>
      </div>

      <div className="text-[#c3d0e3] font-semibold text-[15px] ">
        <p className="my-[5px]">Release Date: {album?.release_date}</p>
      </div>
    </div>
  );
};

export default AlbumInfo;
