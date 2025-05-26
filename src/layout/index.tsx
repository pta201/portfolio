import { PropsWithChildren } from "react";
import MainHeader from "./MainHeader";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="basis-20">
        <MainHeader />
      </header>
      <main className="flex-1 grid">{children}</main>
    </div>
  );
};

export default AppLayout;
