export const VIDEO_CATEGORIES =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c";

export const POPULAR_VIDEOS =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&maxResults=50&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c";

// export const YOUTUBE_AUTO_COMPLETE =
//   "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c";

export const getVideosUrl = (categoryId) => {
  return `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c`;
};

export const getSearchSuggestionsUrl = (searchString) => {
  return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${searchString}&key=AIzaSyDlKCi-6aHzF5wrzmev_rCTgJ2noD-wP1c`;
};
