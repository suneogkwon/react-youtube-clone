import React from "react";
import SearchHeader from "~/components/search_header";
import { Outlet } from "react-router";
import SideBar from "~/components/side_bar";

function HomeLayout() {
  return (
    <>
      <SearchHeader />
      <div className={"w-full flex flex-nowrap"}>
        <SideBar />
        <div className={"pl-4 pr-4 w-full flex justify-center"}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default HomeLayout;
