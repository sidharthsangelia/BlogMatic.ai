import { Ghost } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="transition-colors duration-200 text-gray-600 hover:text-purple-500"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  return (
    <nav className="container flex item-center justify-between px-8 py-4 mx-auto">
      <div className="flex lg:flex-1">
        <Link
          href="/"
          className="transition-colors duration-200 text-gray-600 hover:text-purple-500"
        >
          <span className="flex items-center gap-2 shrink-0">
            <Ghost className="hover:rotate-12 transform transition duration-200 ease-in-out" />
            <span className="font-extrabold text-lg"> BlogMatic Ai</span>
          </span>
        </Link>
      </div>
      <div className="flex lg:justify-center gap-2 lg:gap-12 lg:items-center">
        <NavLink href="/pricing">Pricing</NavLink>
        <NavLink href="/posts">Your Posts</NavLink>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <NavLink href="/dashboard">Upload a Video</NavLink>
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
          
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <NavLink href="/sign-in">Sign In</NavLink>
    </nav>
  );
}
