import { TypographyH3 } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
export default function About() {
  return (
    <div className="flex flex-col gap-4">
      {siteConfig.user.about.map((item) => (
        <div key={item.title}>
          <TypographyH3>{item.title}</TypographyH3>
          <p className="text-primary">{item.content}</p>
        </div>
      ))}
    </div>
  );
}
