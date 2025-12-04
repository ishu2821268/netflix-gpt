const VideoTitle = ({ title, overview }) => {
  return (
    <div className="text-white max-w-2xl px-6 md:px-0">
      <h1 className="text-3xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
        {title}
      </h1>

      <p className="mt-4 md:mt-6 text-sm md:text-lg text-gray-200 drop-shadow-md line-clamp-3 md:line-clamp-none">
        {overview}
      </p>

      <div className="mt-6 flex gap-3">
        <button className="flex items-center px-6 py-3 md:px-8 md:py-4 bg-white text-black text-lg md:text-xl font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition duration-200">
          ▶️ <span className="ml-2">Play</span>
        </button>
        <button className="flex items-center px-6 py-3 md:px-8 md:py-4 bg-white/20 text-white text-lg md:text-xl rounded-lg border border-white/30 backdrop-blur-sm hover:bg-white/30 transition duration-200">
          ℹ️ <span className="ml-2">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
