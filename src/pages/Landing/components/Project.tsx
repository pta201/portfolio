import { TypographyH3, TypographySmall } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
import Image from "next/image";
import Link from "next/link";

export default function Project() {
  return (
    <div className="flex flex-col gap-4">
      {siteConfig.user.projects.map((item, index) => (
        <div
          key={item.title}
          className={`grid grid-cols-1 place-content-center gap-2 md:grid-cols-2`}
        >
          <div
            className={`order-1 ${
              index % 2 === 0 ? "md:order-1" : "md:order-2"
            }`}
          >
            <TypographyH3 className="font-bold text-xl">
              {item.title}
            </TypographyH3>
            <TypographySmall className="break-words">
              {item.description}
            </TypographySmall>
          </div>
          <div
            className={`order-2 mx-auto ${
              index % 2 === 0 ? "md:order-2" : "md:order-1"
            }`}
          >
            <Link href={item.repoLink} target="_blank">
              <Image
                src={item.image}
                height={400}
                width={500}
                alt={item.title}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
