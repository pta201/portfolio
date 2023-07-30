import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { MdFace } from "react-icons/md";
import { siteConfig } from "../constants/config/site";

export default function Icon() {
  return <MdFace className="text-4xl" />;
}
const Logo = () => {
  return (
    <Avatar className="w-10 h-10 rounded-full overflow-hidden">
      <AvatarImage
        src={siteConfig.user.github}
        alt={`${siteConfig.user.name}`}
      />
      <AvatarFallback>
        <MdFace className="text-4xl" />
      </AvatarFallback>
    </Avatar>
  );
};
Icon.Logo = Logo;
