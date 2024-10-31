import PropType from "prop-types";

const Queue = ({ tracks, setCurrentTrack, currentTrack }) => {
  Queue.propTypes = {
    tracks: PropType.array,
    setCurrentTrack: PropType.func,
    currentTrack: PropType.object,
  };

  return (
    <div className="flex w-[100%] h-[20%] rounded-[30px] rounded-tr-[8px] bg-[#3b4461] opacity-1 flex-col justify-center items-center mb-2">
      <div className="flex h-[85%] w-[90%] flex-col justify-between">
        <p className="text-[20px] font-[700]">Songs</p>
        <div className="overflow-auto">
          {tracks?.map((track, index) => {
            return (
              <div
                key={track.track.id}
                className="flex justify-between items-center w-[100%] gap-8"
              >
                <div className="flex items-center">
                  <p className="text-[#c3d0e3] text-[15px]">{index + 1}</p>
                  <div className="ml-4 flex gap-5">
                    <p className="text-[#c3d0e3] text-[15px]">
                      {track.track.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {currentTrack.id !== track.track.id ? (
                    <button
                      onClick={() => setCurrentTrack(track.track)}
                      className="text-[#c3d0e3] text-[15px] bg-[#27354d] px-2 py-1 rounded-lg"
                    >
                      Play
                    </button>
                  ) : (
                    <button className="text-[#c3d0e3] text-[15px] bg-[#27354d] px-2 py-1 rounded-lg">
                      Reproduciendo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Queue;
