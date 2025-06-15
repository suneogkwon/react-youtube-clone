import React from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/videos_search";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { SearchVideoCard } from "~/components/video_card";
import { useYoutubeApi } from "~/context/youtube_api_context";

function VideosSearch({ params }: Route.ComponentProps) {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("query") || "";
  const youtubeApi = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["videos", keyword],
    staleTime: 1000 * 60 * 5,
    queryFn: () => youtubeApi.searchVideosByKeyword(keyword),
  });

  return (
    <div>
      {isLoading ? (
        <h1>Loading </h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : (
        <ul className={"max-w-[1080px]"}>
          {videos.items.map((video) => (
            <SearchVideoCard key={video.id} video={video} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default VideosSearch;
