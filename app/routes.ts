import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("routes/home_layout.tsx", [
    index("routes/home.tsx"),
    ...prefix("videos", [route("search", "routes/videos_search.tsx")]),
  ]),
  layout("routes/video_detail_layout.tsx", [
    ...prefix("videos", [route("watch/:videoId", "routes/video_detail.tsx")]),
  ]),
] satisfies RouteConfig;
