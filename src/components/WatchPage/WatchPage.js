import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { closeSidebar } from "../../utils/appSlice";

const WatchPage = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(closeSidebar());
    fetchVideoDetails();
    fetchCommentsThread();
  }, []);

  const fetchVideoDetails = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c`
    );
    const videoDetails = await data.json();
    console.log(videoDetails.items[0]);
    setVideoDetails(videoDetails.items[0]);
  };

  const fetchCommentsThread = async () => {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c`
    );
    const comments = await data.json();
    setComments(comments.items);
    console.log(comments.items);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const ShowDetails = (details, comments) => {
    const { snippet, statistics } = details;
    const { title, channelTitle, description, publishedAt } = snippet;
    const { commentCount, likeCount, viewCount } = statistics;

    return (
      <div className="flex flex-col w-full p-4">
        {/* Video Title */}
        <h1 className="text-lg font-bold mb-2">{title}</h1>

        {/* Channel Info */}
        <div className="flex items-center mb-4">
          <img
            src="https://yt3.ggpht.com/a-/AOh14GjFpgyuFuY2oBpLiwCDUHES3ZgKYYY-mXBwPg=s68-c-k-c0x00ffffff-no-rj-mo"
            alt="Channel Icon"
            className="rounded-full h-10 w-10 mr-4"
          />
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold">{channelTitle}</h3>
            <span className="text-xs text-gray-500">
              {formatDate(publishedAt)}
            </span>
          </div>
          <button className="ml-auto bg-red-500 text-white text-sm px-4 py-1 rounded">
            Subscribe
          </button>
        </div>

        {/* Video Stats */}
        <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
          <span>{viewCount} views</span>
          <span>{likeCount} likes</span>
        </div>

        {/* Video Description */}
        <div className="text-sm text-gray-700 mb-4">{description}</div>

        {/* Comment Section */}
        <div className="border-t pt-4">
          <h2 className="text-md font-semibold mb-4">
            {commentCount} Comments
          </h2>
          <div className="flex items-center mb-6">
            <div className="rounded-full h-10 w-10 bg-gray-200 mr-4"></div>
            <input
              type="text"
              placeholder="Add a comment..."
              className="w-full bg-gray-100 border rounded-full py-2 px-4 text-sm"
            />
          </div>
          <div className="space-y-6">
            {comments.map((commentThread) => {
              const comment = commentThread.snippet.topLevelComment.snippet;
              return (
                <div key={commentThread.id} className="flex">
                  <img
                    src={comment.authorProfileImageUrl}
                    alt={comment.authorDisplayName}
                    className="rounded-full h-8 w-8 mr-4"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <div>
                        <span className="text-sm font-semibold">
                          {comment.authorDisplayName}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(comment.publishedAt)}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <span>{comment.likeCount} likes</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-800 mt-1">
                      {comment.textDisplay}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  if (!videoDetails) {
    return null;
  }

  return (
    <div className="m-10">
      <iframe
        width="1000"
        height="500"
        src={"https://www.youtube.com/embed/" + videoId}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      {ShowDetails(videoDetails, comments)}
    </div>
  );
};

export default WatchPage;
