import React from "react";
import type { Route } from "../../.react-router/types/app/routes/+types/video_detail";
import { useQuery } from "@tanstack/react-query";
import { useYoutubeApi } from "~/context/youtube_api_context";
import { formatNumberToCompact } from "~/utils/number_formatter";
import { formatTimeAgo } from "~/utils/date_formatter";
import { Bookmark, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { RelatedVideoCard } from "~/components/video_card";

function VideoDetail({ params }: Route.ComponentProps) {
  const { videoId } = params;
  const youtubeApi = useYoutubeApi();
  const {
    isLoading,
    error,
    data: video,
  } = useQuery({
    queryKey: ["video", videoId],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => youtubeApi.getVideoDetails(videoId),
  });

  return (
    <div className={"max-w-[2300px] w-full flex flex-col lg:flex-row"}>
      {isLoading ? (
        <div></div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          <section className={"flex-4 md:min-w-[640px]"}>
            <VideoPlayer video={video} />
            <div className={"md:flex md:items-center md:justify-between mb-4"}>
              <ChannelDetail channelId={video.channelId} />
              <VideoActions video={video} />
            </div>
            <VideoDescription video={video} />
          </section>
          <section className={"lg:w-[450px]"}>
            <RelatedVideoList video={video} />
          </section>
        </>
      )}
    </div>
  );
}

function VideoPlayer({ video }) {
  return (
    <>
      <div className={"mb-4 aspect-video w-full rounded-2xl overflow-hidden"}>
        <iframe
          id="player"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${video.id}`}
        />
      </div>
      <h1 className={"mb-4 font-semibold text-[1.2rem]"}>{video.title}</h1>
    </>
  );
}

function ChannelDetail({ channelId }) {
  const youtubeApi = useYoutubeApi();
  const {
    isLoading,
    error,
    data: channel,
  } = useQuery({
    queryKey: ["channel", channelId],
    staleTime: 1000 * 60 * 60,
    queryFn: () => youtubeApi.getChannelDetails(channelId),
  });

  if (isLoading) {
    return <div></div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  const { thumbnail, title, subscriberCount } = {
    thumbnail: channel.thumbnail,
    title: channel.title,
    subscriberCount: channel.subscriberCount,
  };

  return (
    <div className={"flex items-center mb-4 md:mb-0"}>
      <img
        className={"w-10 h-10 rounded-full mr-4"}
        src={thumbnail}
        alt={title}
      />
      <div className={"mr-8"}>
        <p className={"font-medium"}>{title}</p>
        <p className={"text-[0.8rem] opacity-60"}>
          {`구독자 ${formatNumberToCompact(subscriberCount)}`}
        </p>
      </div>
      <button className={"bg-gray-100 rounded-full px-4 py-2"}>
        <span className={"text-black"}>구독</span>
      </button>
    </div>
  );
}

function VideoActions({ video }) {
  const likeCount = video.likeCount;

  return (
    <div className={"flex items-center"}>
      <div className={"mr-4 flex items-center bg-zinc-800 rounded-full"}>
        <button className={" px-4 py-2"}>
          <span className={""}>
            <ThumbsUp className={"inline mr-2"} strokeWidth={1} />
            {formatNumberToCompact(likeCount)}
          </span>
        </button>
        <div className={"w-[1px] bg-zinc-500 mt-2 mb-2 self-stretch"} />
        <button className={" px-4 py-2"}>
          <span className={""}>
            <ThumbsDown strokeWidth={1} />
          </span>
        </button>
      </div>
      <button className={"mr-4  bg-zinc-800 rounded-full px-4 py-2"}>
        <Share2 className={"inline mr-2"} strokeWidth={1} />
        공유
      </button>
      <button className={"bg-zinc-800 rounded-full px-4 py-2"}>
        <Bookmark className={"inline mr-2"} strokeWidth={1} />
        저장
      </button>
    </div>
  );
}

function VideoDescription({ video }) {
  const { viewCount, publishedAt, description } = video;
  return (
    <div className={"bg-zinc-800  p-4 rounded-xl text-[0.9rem] "}>
      <p>{`조회수 ${formatNumberToCompact(viewCount)} ${formatTimeAgo(publishedAt)}`}</p>
      <p>{description}</p>
    </div>
  );
}

function RelatedVideoList({ video }) {
  const youtubeApi = useYoutubeApi();
  const {
    isLoading,
    error,
    data: videos,
  } = useQuery({
    queryKey: ["relatedVideo", video.id],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => youtubeApi.getRelatedVideos(video.title),
  });

  if (isLoading) {
    return <div></div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ul className={"pt-6 lg:pt-0 lg:pl-6 w-full"}>
      {videos.items.map((item) => (
        <RelatedVideoCard key={item.id} video={item} />
      ))}
    </ul>
  );
}

export default VideoDetail;
