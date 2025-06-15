import React from "react";
import { formatNumberToCompact } from "~/utils/number_formatter";
import { formatDuration, formatTimeAgo } from "~/utils/date_formatter";
import { Link } from "react-router";

export function VideoCard({ video }) {
  const { thumbnail, duration, title, channelTitle, viewCount, publishedAt } =
    video;

  return (
    <Link to={`/videos/watch/${video.id}`}>
      <div className={"w-full"}>
        <div className={"mb-3 relative overflow-hidden"}>
          <img
            className={"w-full aspect-video object-cover rounded-2xl"}
            src={thumbnail}
            alt={title}
          />
          <div
            className={
              "absolute right-2.5 bottom-2.5 text-[0.8rem] bg-black/70 text-white px-1 py-0.3 rounded"
            }
          >
            {formatDuration(duration)}
          </div>
        </div>
        <p className={"mb-1 font-semibold line-clamp-2"}>{title}</p>
        <div className={"opacity-60 text-[0.9rem]"}>
          <p>{channelTitle}</p>
          <p>
            {`조회수 ${formatNumberToCompact(viewCount)} • ${formatTimeAgo(publishedAt)}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function SearchVideoCard({ video }) {
  const {
    thumbnail,
    title,
    description,
    channelTitle,
    viewCount,
    publishedAt,
  } = video;

  return (
    <Link to={`/videos/watch/${video.id}`}>
      <div className={"w-full flex mb-4"}>
        <div className={"mr-4 flex-1/2 relative overflow-hidden"}>
          <img
            className={"w-full aspect-video object-cover rounded-2xl"}
            src={thumbnail}
            alt={title}
          />
        </div>
        <div className={"flex-1/2"}>
          <p className={"mb-1 font-semibold line-clamp-2"}>{title}</p>
          <div className={"opacity-60 text-[0.9rem]"}>
            <p className={"mb-3"}>
              {`조회수 ${viewCount === 0 ? "없음" : formatNumberToCompact(viewCount)} • ${formatTimeAgo(publishedAt)}`}
            </p>
            <p className={"mb-3"}>{channelTitle}</p>
            <p className={"line-clamp-2"}>{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RelatedVideoCard({ video }) {
  const { thumbnail, title, channelTitle, viewCount, publishedAt } = video;

  return (
    <Link to={`/videos/watch/${video.id}`}>
      <div className={"mb-4 flex flex-col lg:flex-row cursor-pointer"}>
        <img
          className={
            "lg:mr-2 lg:w-[180px] mb-2 lg:mb-0 aspect-video object-cover rounded-xl"
          }
          src={thumbnail}
          alt={title}
        />
        <div className={"flex-1"}>
          <h2 className={"font-medium text-[0.9rem] mb-1 lg:mb-2 line-clamp-2"}>
            {title}
          </h2>
          <p
            className={"inline lg:block mr-4 lg:mr-0 text-[0.8rem] opacity-60"}
          >
            {channelTitle}
          </p>
          <p className={"inline lg:block text-[0.8rem] opacity-70"}>
            {`조회수 ${formatNumberToCompact(viewCount)} • ${formatTimeAgo(publishedAt)}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
