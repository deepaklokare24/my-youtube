import React from "react";
import HomeIcon from "../../assets/icons/HomeIcon";
import TrendingIcon from "../../assets/icons/TrendingIcon";
import SubscriptionIcon from "../../assets/icons/SubscriptionIcon";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="col-span-1 bg-yt-nav h-screen m-8 shadow-lg">
      <div className="divide-y divide-yt-icon">
        <ul>
          <Link to="/">
            <ListItem title="Home">
              <HomeIcon />
            </ListItem>
          </Link>
          <ListItem title="Trending">
            <TrendingIcon />
          </ListItem>
          <ListItem title="Subscriptions">
            <SubscriptionIcon />
          </ListItem>
        </ul>
        <ul>
          <ListItem title="Home">
            <HomeIcon />
          </ListItem>
          <ListItem title="Trending">
            <TrendingIcon />
          </ListItem>
          <ListItem title="Subscriptions">
            <SubscriptionIcon />
          </ListItem>
          <ListItem title="Home">
            <HomeIcon />
          </ListItem>
          <ListItem title="Trending">
            <TrendingIcon />
          </ListItem>
          <ListItem title="Subscriptions">
            <SubscriptionIcon />
          </ListItem>
        </ul>
      </div>
    </div>
  );
};

const ListItem = (props) => {
  return (
    <li className="flex flex-row justify-start gap-6 hover:bg-yt-hoverColor p-2">
      {props.children}
      <span className="mx-8 px-2 text-medium">{props.title}</span>
    </li>
  );
};

export default SideBar;
