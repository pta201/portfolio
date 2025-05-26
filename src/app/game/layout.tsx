import GameProvider from "@/pages/Game/provider";
import { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <GameProvider>{children}</GameProvider>;
};

export default Layout;
