import AlbumImage from "./AlbumImage";
import AlbumInfo from "./AlbumInfo";
import PropTypes from "prop-types";

const SongCard = ({ album }) => {
  SongCard.propTypes = {
    album: PropTypes.object,
  };

  return (
    <div className="w-[100%] h-[100%] rounded-[30px] bg-[#27354d] rounded-br-[0px] flex flex-col justify-center items-center mt-2 gap-14">
      {album && (
        <>
          <AlbumImage uri={album?.images[0]?.url} />
          <AlbumInfo album={album} />
        </>
      )}
    </div>
  );
};

export default SongCard;
