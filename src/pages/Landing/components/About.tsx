import { siteConfig } from "@/constants/config/site";
export default function About() {
  return (
    <div className="flex flex-col gap-4">
      {siteConfig.user.about.map((item) => (
        <div key={item.title}>
          <h3 className="text-sky-400">{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
