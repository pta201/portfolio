import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import { PropsWithChildren } from "react";
import MainHeader from "./MainHeader";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-[64px]">
        <MainHeader />
      </header>
      <main
        className="flex-1 grid overflow-auto max-h-[calc(100vh-64px-48px)] h-[calc(100vh-64px-48px)]"
        id="main-content"
      >
        {children}
      </main>
      <footer className="h-[48px]">
        <SpotifyNowPlaying />
      </footer>
    </div>
  );
};

export default AppLayout;
