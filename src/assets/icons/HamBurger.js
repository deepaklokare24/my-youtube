import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../utils/appSlice";

const HamBurger = () => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    console.log("hamBurger cliked");
    dispatch(toggleSidebar());
  };
  return (
    <svg
      className="fill-current text-black h-6 w-6 cursor-pointer"
      viewBox="0 0 100 80"
      onClick={clickHandler}
    >
      <rect width="100" height="15" rx="8"></rect>
      <rect y="30" width="100" height="15" rx="8"></rect>
      <rect y="60" width="100" height="15" rx="8"></rect>
    </svg>
  );
};

export default HamBurger;
