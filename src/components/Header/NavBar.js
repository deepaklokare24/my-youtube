import React, { useEffect, useState } from "react";
import { YouTube } from "../../assets/icons/YouTube";
import HamBurger from "../../assets/icons/HamBurger";
//import Search from "../../assets/icons/Search";
import Create from "../../assets/icons/Create";
import MenuIcon from "../../assets/icons/MenuIcon";
import NotificationIcon from "../../assets/icons/NotificationIcon";
import { Search, X } from "react-feather";
import { getSearchSuggestionsUrl } from "../../utils/constants";

const NavBar = () => {
  const [searchString, setSearchString] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchString) {
      return;
    }
    const timer = setTimeout(() => {
      fetchSearchSuggestions();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchString]);
  const handleInputSearch = (e) => {
    const searchStr = e.target.value;
    if (searchStr) {
      setSearchString(searchStr);
    } else {
      clearSearch();
    }
  };

  const fetchSearchSuggestions = async () => {
    const YOUTUBE_AUTO_COMPLETE = getSearchSuggestionsUrl(searchString);
    const data = await fetch(YOUTUBE_AUTO_COMPLETE);
    const value = await data.json();

    const suggestions = value?.items
      .map((value) => value?.snippet?.title)
      .map((suggestion) => suggestion.substring(0, 40));
    setSuggestions(suggestions);
  };

  const clearSearch = () => {
    setSearchString("");
    setSuggestions([]);
  };

  return (
    <div className="bg-yt-nav h-16 block shadow-md">
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-1 bg-yt-nav h-screen">
          <div className="text-black p-4">
            <div className="flex flex-row">
              <span className="mr-8 px-6">
                <HamBurger />
              </span>
              <span>
                <YouTube />
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-3 p-4 relative">
          <div className="flex justify-center relative">
            <div className="w-3/5 flex relative">
              <input
                className="placeholder-gray-500 w-full bg-yt-insideBox text-yt-textBox text-base h-8 px-2 inline-block rounded-l-full border border-black pr-10"
                placeholder="Search"
                value={searchString}
                onChange={handleInputSearch}
              />
              {searchString && (
                <button
                  className="absolute right-20 top-2 text-gray-500 hover:text-black"
                  onClick={clearSearch}
                >
                  <X size={16} />
                </button>
              )}
              <button className="bg-yt-searchButton h-8 w-16 text-center px-2 text-base flex justify-center items-center rounded-r-full border border-black">
                <Search />
              </button>
            </div>
          </div>

          {/* Auto-suggestion dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute bg-white w-3/5 mt-2 left-1/2 transform -translate-x-1/2 border border-gray-300 rounded-lg shadow-lg z-10">
              <ul>
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSearchString(item);
                      setSuggestions([]);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="col-span-1 p-4 flex justify-end items-center">
          <div className="flex space-x-4">
            <Create />
            <MenuIcon />
            <NotificationIcon />
            <img
              src="https://yt3.ggpht.com/mE4RmPk7aLK_zELzjVPG0qE5XqZ2bslstJZAnRIxjg9KgN4hIPv0vUTZUcaCDIJRCrlk2Q2a3A=s88-c-k-c0x00ffffff-no-rj"
              alt="profile_image"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
