"use client";

import Icon from "@/components/Icon";
import { siteConfig } from "@/constants/config/site";
import Nav from "@/pages/Landing/layout/MainNav";

export default function MainHeader() {
  return (
    <div className="flex items-center justify-between border-b border-b-white bg-black text-white py-4 px-2">
      <div>
        <Nav.Item
          content={
            <div className="flex items-center gap-2">
              <Icon.Logo />
              <div>{siteConfig.user.name}</div>
            </div>
          }
          href="/"
        />
      </div>
      <Nav />
    </div>
  );
}
