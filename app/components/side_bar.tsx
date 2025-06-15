import React from "react";
import {
  Clock,
  Download,
  Film,
  History,
  Home,
  ListVideo,
  MonitorPlay,
  Music,
  ThumbsUp,
  Tv,
} from "lucide-react";
import { useSideBar } from "~/context/side_bar_context";

function SideBar(props) {
  const buttonStyle = "pt-2 pb-2 pl-5 rounded-xl hover:bg-zinc-600";
  const iconStyle = "inline mr-6";
  const dividerStyle = "w-full bg-zinc-500 h-px mt-4 mb-4";

  const { sideBar: isOpen } = useSideBar();

  return (
    <>
      <div
        className={`${!isOpen && "hidden"} w-[250px] h-screen pt-4 pr-4 z-10 absolute top-[77px] left-4 bg-neutral-900`}
      >
        <ul className={"w-4/5"}>
          <li className={buttonStyle}>
            <Home className={iconStyle} />
            <span>Home</span>
          </li>
          <li className={buttonStyle}>
            <Film className={iconStyle} />
            <span>Shorts</span>
          </li>
          <li className={buttonStyle}>
            <Tv className={iconStyle} />
            <span>Subscriptions</span>
          </li>
          <li className={buttonStyle}>
            <Music className={iconStyle} />
            <span>Music</span>
          </li>
        </ul>
        <div className={dividerStyle} />
        <ul className={"w-4/5"}>
          <li className={buttonStyle}>
            <span>You 〉</span>
          </li>
          <li className={buttonStyle}>
            <History className={iconStyle} />
            <span>History</span>
          </li>
          <li className={buttonStyle}>
            <ListVideo className={iconStyle} />
            <span>Playlist</span>
          </li>
          <li className={buttonStyle}>
            <MonitorPlay className={iconStyle} />
            <span>Your video</span>
          </li>
          <li className={buttonStyle}>
            <Clock className={iconStyle} />
            <span>Watch later</span>
          </li>
          <li className={buttonStyle}>
            <ThumbsUp className={iconStyle} />
            <span>Liked videos</span>
          </li>
          <li className={buttonStyle}>
            <Download className={iconStyle} />
            <span>Downloads</span>
          </li>
        </ul>
      </div>
      <div
        className={`${!isOpen && "hidden"} w-[250px] mr-4 shrink-0 hidden lg:block`}
      />
    </>
  );
}

export default SideBar;
