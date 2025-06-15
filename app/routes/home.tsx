import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useYoutubeApi } from "~/context/youtube_api_context";
import { VideoCard } from "~/components/video_card";
import { Link } from "react-router";

export default function Home() {
  const youtubeApi = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", "most_popular"],
    staleTime: 1000 * 60 * 5,
    queryFn: () => youtubeApi.getMostPopularVideos(),
  });

  return (
    <>
      <title>New React Router App</title>
      <meta name={"description"} content={"Welcome to React Router!"} />
      {isLoading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <div
          className={
            "max-w-[3000px] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-10"
          }
        >
          {videos?.items.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </>
  );
}
