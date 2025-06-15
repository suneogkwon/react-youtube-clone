import React from "react";
import { useQuery } from "@tanstack/react-query";

const Videos = () => {
  const videos = useQuery({
    queryKey: ["most_popular_videos"],
    queryFn: getVideos,
  });

  async function getVideos() {
    const res = await fetch("/videos/most_popular_videos.json");

    return await res.json();
  }

  return <div>`${videos.data}`</div>;
};

export default Videos;
