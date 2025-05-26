import { TypographyH4, TypographySmall } from "@/components/ui/typography";
import { siteConfig } from "@/constants/config/site";
import Link from "next/link";
export default function Contact() {
  const email = siteConfig.user.email;
  const emailSubject = "Hello!";
  const emailBody = "Hi! I would love to hear from you!";
  return (
    <section className="flex flex-col gap-8">
      <TypographyH4 className="mx-auto">
        Yay! You clicked on the contact button! 🎉
      </TypographyH4>
      <TypographySmall>
        Let's get to know each other! I would love to hear from you! 💬
      </TypographySmall>
      <TypographySmall>
        You can reach me at:{" "}
        <Link
          href={`mailto:${email}&subject=${emailSubject}&body=${emailBody}`}
          className="text-accent-foreground"
        >
          {email}
        </Link>{" "}
        📧
      </TypographySmall>
      <TypographySmall>
        You can also find me on{" "}
        <Link
          href={siteConfig.user.facebook}
          target="_blank"
          className="text-accent-foreground"
        >
          Facebook
        </Link>{" "}
        and{" "}
        <Link
          href={siteConfig.user.github}
          target="_blank"
          className="text-accent-foreground"
        >
          Github
        </Link>{" "}
        👨‍💻
      </TypographySmall>
    </section>
  );
}
