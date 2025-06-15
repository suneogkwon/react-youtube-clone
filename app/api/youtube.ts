import axios, { type AxiosInstance } from "axios";

export interface YoutubeInterface {
  getVideoDetails: (videoId: string) => Promise<any>;
  getMostPopularVideos: () => Promise<any>;
  getRelatedVideos: (title: string) => Promise<any>;
  searchVideosByKeyword: (keyword: string) => Promise<any>;
  getChannelDetails: (channelId: string) => Promise<any>;
}

export class Youtube implements YoutubeInterface {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: {
        key: import.meta.env.VITE_YOUTUBE_API_KEY,
        regionCode: "KR",
        relevanceLanguage: "ko",
      },
    });
  }

  async getVideoDetails(videoId: string) {
    const res = await this.httpClient.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: videoId,
      },
    });
    const data = res.data;

    if (data.items.length === 0) {
      throw new Error("Video not found");
    }

    const item = data.items[0];

    return {
      id: item.id,
      channelId: item.snippet.channelId,
      thumbnail: item.snippet.thumbnails.standard.url,
      duration: item.contentDetails.duration,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics.viewCount || 0,
      likeCount: item.statistics.likeCount || 0,
      publishedAt: item.snippet.publishedAt,
    };
  }

  async getMostPopularVideos() {
    const res = await this.httpClient.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        maxResults: 25,
      },
    });
    const data = res.data;
    const items = data.items.map((item) => ({
      id: item.id,
      thumbnail: item.snippet.thumbnails.standard.url,
      duration: item.contentDetails.duration,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount || 0,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      ...data,
      items: items,
    };
  }

  async getRelatedVideos(title: string) {
    const res = await this.httpClient.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        maxResults: 25,
        q: title,
      },
    });
    const data = res.data;
    const items = data.items.map((item) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: item.contentDetails?.duration || "0",
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount || 0,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      ...data,
      items: items,
    };
  }

  async searchVideosByKeyword(keyword) {
    const res = await this.httpClient.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        maxResults: 25,
        q: keyword,
      },
    });
    const data = res.data;
    const items = data.items.map((item) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: item.contentDetails?.duration || "0",
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount || 0,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      ...data,
      items: items,
    };
  }

  async getChannelDetails(channelId: string) {
    const res = await this.httpClient.get("/channels", {
      params: {
        part: "snippet,statistics",
        id: channelId,
      },
    });
    const data = res.data;

    if (data.items.length === 0) {
      throw new Error("Channel not found");
    }

    const channel = data.items[0];

    return {
      id: channel.id,
      title: channel.snippet.title,
      thumbnail: channel.snippet.thumbnails.default.url,
      subscriberCount: channel.statistics.subscriberCount || 0,
    };
  }
}

export class YoutubeFake implements YoutubeInterface {
  constructor() {}

  async getVideoDetails(videoId: string) {
    const res = await axios.get("/videos/video_details_data.json");
    const data = res.data;

    if (data.items.length === 0) {
      throw new Error("Video not found");
    }

    return data.items[0];
  }

  async getMostPopularVideos() {
    const res = await axios.get("/videos/most_popular_videos_data.json");

    const data = res.data;
    const items = data.items.map((item) => ({
      id: item.id,
      thumbnail: item.snippet.thumbnails.standard.url,
      duration: item.contentDetails.duration,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount || 0,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      ...data,
      items: items,
    };
  }

  async getRelatedVideos(title: string) {
    const res = await axios.get("/videos/search_by_keyword_data.json");

    const data = res.data;
    const items = data.items.map((item) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: item.contentDetails?.duration || "0",
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount || 0,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      ...data,
      items: items,
    };
  }

  async searchVideosByKeyword(keyword) {
    const res = await axios.get("/videos/search_by_keyword_data.json");

    const data = res.data;
    const items = data.items.map((item) => ({
      id: item.id.videoId,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: item.contentDetails?.duration || "0",
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      viewCount: item.statistics?.viewCount || 0,
      publishedAt: item.snippet.publishedAt,
    }));

    return {
      ...data,
      items: items,
    };
  }

  async getChannelDetails(channelId: string) {
    const res = await axios.get("/videos/channel_by_id_data.json");
    const data = res.data;

    if (data.items.length === 0) {
      throw new Error("Channel not found");
    }

    return data.items[0];
  }
}
