import { createContext, useContext } from "react";
import { Youtube, YoutubeFake, type YoutubeInterface } from "~/api/youtube";

const YoutubeApiContext = createContext<YoutubeInterface>({});
export const useYoutubeApi = () => useContext(YoutubeApiContext);

export function YoutubeApiProvider({ children }) {
  const youtubeApi = new Youtube();

  return (
    <YoutubeApiContext.Provider value={youtubeApi}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
