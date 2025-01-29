import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import { AvatarImage } from "./ui/avatar";
import { Home, LayoutDashboard, User } from "lucide-react";
import { Book } from "lucide-react";
import LogoutButton from "./LogoutButton";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { getUserProfileAction } from "@/app/update-profile/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const SIDEBAR_LINKS = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: Book,
    label: "Books",
    href: "/merch",
  },
];

const Sidebar = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  const userProfile = await getUserProfileAction();

  const isAdmin = process.env.NEXT_PUBLIC_ADMIN_EMAIL === user?.email;

  return (
    <div className="flex lg:w-1/5 w-1/6 flex-col gap-3 px-2 border-r sticky left-0 top-0 h-screen">
      <Link href="/update-profile" className="max-w-fit">
        <Avatar className="mt-4 cursor-pointer">
          <AvatarImage
            src={userProfile?.image || "/user-placeholder.png"}
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <nav className="flex flex-col gap-3">
        {SIDEBAR_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
          >
            <link.icon className="w-6 h-6" />
            <span className="hidden lg:block">{link.label}</span>
          </Link>
        ))}
        {isAdmin && (
          <Link
            href={"/secret-dashboard"}
            className="flex lg:w-full w-12 items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal"
          >
            <LayoutDashboard className="w-6 h-6" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>
        )}
        <DropdownMenu>
          <div className="flex w-12 lg:w-full items-center gap-2 hover:bg-primary-foreground font-bold hover:text-primary px-2 py-1 rounded-full justify-center lg:justify-normal">
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User className="w-6 h-6" />
              <span className="hidden lg:block">Setting</span>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={"#"}>
              <DropdownMenuItem>Billing</DropdownMenuItem>
            </Link>
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
      </nav>
    </div>
  );
};

export default Sidebar;
