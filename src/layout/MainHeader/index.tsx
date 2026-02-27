"use client";

import Icon from "@/components/Icon";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { siteConfig } from "@/constants/config/site";
import Nav from "@/layout/MainNav";

export default function MainHeader() {
  return (
    <div className="flex items-center justify-between border-b border-b-accent bg-primary/80 text-accent px-4 h-full">
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
      <ThemeToggle />
    </div>
  );
}
