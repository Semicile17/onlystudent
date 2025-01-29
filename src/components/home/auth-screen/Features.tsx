/* eslint-disable @next/next/no-img-element */
import UnderlineText from "@/components/decorators/UnderlineText";
import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Study Notes",
    description:
      "Access high-quality handwritten notes to simplify your learning. From tips on effective studying to organizing your material, we've got you covered.",
    image: "/gifs/gif1.gif",
  },
  {
    title: "Skill Development",
    description:
      "Enhance your academic and extracurricular skills with our detailed tutorials. Whether you're preparing for exams, learning coding, or mastering a new hobby, find resources in seconds.",
    image: "/gifs/gif2.gif",
  },
  {
    title: "Campus Life Insights",
    description:
      "Explore the day-to-day life of students, including managing academics, building friendships, and participating in campus activities.",
    image: "/gifs/gif3.gif",
  },
];

const featureList: string[] = [
  "Exam Preparation Tips",
  "Daily Study Hacks",
  "Behind-the-Scenes Campus Insights",
  "Skill-Building Tutorials",
  "Learning Techniques",
  "Student Life Advice",
];

function Features() {
  return (
    <section className="container py-24 sm:py-32 space-y-8">
      <h2 className="text-3xl lg:text-4xl font-bold text-center">
        Many{" "}
        <UnderlineText className="underline-offset-8">
          OnlyStudents
        </UnderlineText>{" "}
        Features🧑‍🎓
      </h2>
      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature) => (
          <div key={feature}>
            <Badge className="text-sm rounded-full" variant={"secondary"}>
              {feature}
            </Badge>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }) => (
          <Card key={title} className="flex flex-col">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>
            <CardFooter>
              <img
                src={image}
                alt="Feature item"
                className="rounded w-[250px] h-32 lg:w-[300px] mx-auto select-none pointer-events-none"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default Features;
