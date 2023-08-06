import { NavItems } from "@/constants/config/layout";
import Link from "next/link";
import { ReactNode } from "react";

export default function Nav() {
  return (
    <div className="flex">
      {NavItems.map((item) => (
        <Item key={item.content} href={item.href} content={item.content} />
      ))}
    </div>
  );
}

interface NavItemProps {
  href?: string;
  content: ReactNode | JSX.Element;
  isActive?: boolean;
}

export function Item({ href, content, isActive }: NavItemProps) {
  if (href) return <Link href={href}>{content}</Link>;
  return <>{content}</>;
}
Nav.Item = Item;
