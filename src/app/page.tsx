import Signature from "@/components/Signature";
import AnimatedText from "@/components/AnimatedText";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 text-white bg-black">
      <div className="flex justify-between">
        <AnimatedText text="Hi! This is Tien Anh" />

        <div className="w-[200px]">
          <Signature />
        </div>
      </div>
    </main>
  );
}
