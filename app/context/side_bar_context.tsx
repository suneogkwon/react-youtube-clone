import { createContext, useContext, useState } from "react";

const SideBarContext = createContext({});
export const useSideBar = () => useContext(SideBarContext);

export function SideBarProvider({ children }) {
  const [sideBar, setSideBar] = useState(true);

  return (
    <SideBarContext.Provider value={{ sideBar, setSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
}
