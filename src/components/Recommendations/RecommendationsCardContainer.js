import React, { useEffect, useState } from "react";
import { POPULAR_VIDEOS } from "../../utils/constants";
import { Link } from "react-router-dom";

const RecommendationsCardContainer = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getAllVideos();
  }, []);

  const getAllVideos = async () => {
    try {
      const data = await fetch(POPULAR_VIDEOS);
      const videos = await data.json();
      console.log(videos.items);
      setVideos(videos.items);
    } catch (e) {
      console.log(e);
    }
  };

  // const getAllVideos = async () => {
  //   const videoListPromises = categories.map((category) =>
  //     getVideosByCategoryId(category.id)
  //   );
  //   const result = await Promise.all(videoListPromises);

  //   const videos = result
  //     .filter((video) => !video?.error)
  //     .map((video) => video?.items);

  //   const flattenedVideos = videos.reduce((accumulator, currentArray) => {
  //     return accumulator.concat(currentArray);
  //   }, []);

  //   console.log(flattenedVideos);

  //   setVideos(flattenedVideos);
  // };

  if (!videos.length) {
    return null;
  }

  return (
    <main className="col-span-4 block m-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <Link to={`/watch?v=${video.id}`} key={video.id}>
            <VideoTile video={video} />
          </Link>
        ))}
      </div>
    </main>
  );
};

const VideoTile = ({ video }) => {
  const { snippet, statistics } = video;
  const { title, channelTitle, thumbnails } = snippet;
  const { viewCount, publishedAt } = statistics;

  return (
    <div className="flex flex-col p-2 bg-white shadow-md rounded-lg cursor-pointer">
      <img
        className="w-full object-cover h-40 rounded-t-lg"
        src={thumbnails.standard.url}
        alt={title}
      />
      <div className="flex flex-row mt-2">
        <img
          src="https://yt3.ggpht.com/a-/AOh14GjFpgyuFuY2oBpLiwCDUHES3ZgKYYY-mXBwPg=s68-c-k-c0x00ffffff-no-rj-mo"
          alt="Channel Icon"
          className="rounded-full h-10 w-10"
        />
        <div className="flex flex-col ml-2">
          <span className="text-black font-medium">{title}</span>
          <span className="text-gray-500 text-sm">{channelTitle}</span>
          <span className="text-gray-500 text-sm">
            {viewCount} views • {Math.floor(Math.random() * 10)} months ago
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsCardContainer;
