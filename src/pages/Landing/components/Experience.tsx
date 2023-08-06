import { siteConfig } from "@/constants/config/site";
export default function Experience() {
  return (
    <div className="flex flex-col gap-4">
      {siteConfig.user.experiences.map((item) => (
        <div key={item.title}>
          <h3 className="text-sky-400 font-bold text-xl">{item.title}</h3>
          <p className="text-sm">{item.time}</p>
        </div>
      ))}
    </div>
  );
}
