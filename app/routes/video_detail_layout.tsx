import React from "react";
import SearchHeader from "~/components/search_header";
import { Outlet } from "react-router";

function VideoDetailLayout() {
  return (
    <>
      <SearchHeader />
      <div className={"pl-4 pr-4 w-full flex justify-center"}>
        <Outlet />
      </div>
    </>
  );
}

export default VideoDetailLayout;
