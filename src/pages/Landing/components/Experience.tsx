import { TypographyH3, TypographySmall } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
export default function Experience() {
  return (
    <div className="flex flex-col gap-4">
      {siteConfig.user.experiences.map((item) => (
        <div key={item.title}>
          <TypographyH3 className="  font-bold text-xl">
            {item.title}
          </TypographyH3>
          <TypographySmall>{item.time}</TypographySmall>
        </div>
      ))}
    </div>
  );
}
