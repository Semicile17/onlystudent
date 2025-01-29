/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import RotatedText from "@/components/decorators/RotatedText";

const reviews = [
  {
    name: "Aarav",
    username: "@aarav",
    body: "This platform has completely changed the way I study. It's a game-changer for students.",
    img: "https://avatar.vercel.sh/aarav",
  },
  {
    name: "Sara",
    username: "@sara",
    body: "I can't thank you enough for these resources. They've made my exam prep so much easier!",
    img: "https://avatar.vercel.sh/sara",
  },
  {
    name: "Rahul",
    username: "@rahul",
    body: "The tutorials and study tips are incredible. I'm more confident in my skills now.",
    img: "https://avatar.vercel.sh/rahul",
  },
  {
    name: "Ananya",
    username: "@ananya",
    body: "I’ve improved my grades thanks to the detailed notes and guides. Highly recommended!",
    img: "https://avatar.vercel.sh/ananya",
  },
  {
    name: "Ishaan",
    username: "@ishaan",
    body: "I was struggling before, but now I feel more organized and prepared. This is amazing!",
    img: "https://avatar.vercel.sh/ishaan",
  },
  {
    name: "Meera",
    username: "@meera",
    body: "I love the mix of tips, notes, and tutorials. It's everything a student needs in one place.",
    img: "https://avatar.vercel.sh/meera",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="mt-12">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-center tracking-tighter font-bold">
        Why <RotatedText>Choose</RotatedText> Us
      </h2>
      <p className="mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center">
        Hear from our happy customers and see why they love our service.
      </p>

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
}
