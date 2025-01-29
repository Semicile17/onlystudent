/* eslint-disable @next/next/no-img-element */
import RotatedText from "@/components/decorators/RotatedText";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamProps {
	imageUrl: string;
	name: string;
	position: string;
	description: string;
}

const teamList: TeamProps[] = [
	{
		imageUrl: "https://i.pravatar.cc/150?img=35",
		name: "Sophia Patel",
		position: "Frontend Developer",
		description: "Sophia is a Computer Science student specializing in web development. She designed and implemented the user interface of this website.",
	},
	{
		imageUrl: "https://i.pravatar.cc/150?img=60",
		name: "Liam Chen",
		position: "Backend Developer",
		description: "Liam is a Mechanical Engineering student with a strong passion for coding. He built the server-side logic and ensured smooth API integrations.",
	},
	{
		imageUrl: "https://i.pravatar.cc/150?img=36",
		name: "Ava Martinez",
		position: "UI/UX Designer",
		description: "Ava, a Biology student with a creative flair, crafted the website's design to provide a seamless and engaging user experience.",
	},
	{
		imageUrl: "https://i.pravatar.cc/150?img=17",
		name: "Ethan Johnson",
		position: "Project Manager",
		description: "Ethan, a Business Administration student, coordinated the project and ensured that the team met all deadlines and delivered a high-quality product.",
	},
];


const Team = () => {
	return (
		<section className='container py-24 sm:py-32'>
			<h2 className='text-2xl sm:text-3xl md:text-5xl text-center tracking-tighter font-bold'>
				Our <RotatedText>Dedicated</RotatedText> Crew
			</h2>

			<p className='mt-4 mb-10 text-md md:text-xl text-muted-foreground text-center'>
				Meet the team that makes our website a special place for students and teachers alike.
			</p>

			<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10'>
				{teamList.map(({ description, imageUrl, name, position }) => (
					<Card key={name} className='bg-muted/50 relative mt-7 flex flex-col justify-center items-center'>
						<CardHeader className='my-8 flex justify-center items-center pb-2'>
							<img
								src={imageUrl}
								alt='Team member'
								className='absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover'
							/>
							<CardTitle className='text-center'>{name}</CardTitle>
							<CardDescription className='text-primary'>{position}</CardDescription>
						</CardHeader>

						<CardContent className='text-center pb-4 px-2'>
							<p>{description}</p>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};
export default Team;