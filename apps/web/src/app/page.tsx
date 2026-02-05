import { HeroCard } from "@/components/home/HeroCard";
import { Testimonials } from "@/components/home/Testimonials";
import { Community } from "@/components/home/Community";
import { NewsFeed } from "@/components/home/NewsFeed";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 pb-12 overflow-x-hidden">
      <HeroCard />
      <Testimonials />
      <Community />
      <NewsFeed />
    </div>
  );
}
