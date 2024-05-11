"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { authenticateUser, logOutUser } from "../../apiCalls/users";

export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export default function UserHeader() {
  const response = useQuery<User[]>({
    queryKey: ["auth"],
    queryFn: authenticateUser,
  });
  const [drawer, setDrawer] = useState(true);

  const handleDrawerToggle = () => {
    setDrawer(!drawer);
    document.body.classList.toggle("overflow-y-hidden");
  };
  console.log(response.data);

  return (
    <header className="flex flex-row p-4 justify-between h-28 items-center border-b-4">
      <Link href={"/"}>
        <h1 className="text-blue-600 font-bold text-4xl lg:text-5xl max-sm:text-xl hover:cursor-pointer">
          Big sales
        </h1>
      </Link>

      <nav className="flex flex-row gap-5 max-md:hidden">
        <Link href={"/my-posts"}>
          <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-sm text-center max-sm:text-xs">
            My Posts
          </p>
        </Link>
        <Link href={"/create-post"}>
          <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-sm text-center max-sm:text-xs">
            New Post
          </p>
        </Link>
        <Link href={"/"}>
          <button
            className="border-b-2 hover:border-b-2 border-1 border-red-900 hover:border-gray-400 text-sm text-center max-sm:text-xs"
            onClick={logOutUser}
          >
            Sign Out
          </button>
        </Link>
      </nav>
    </header>
  );
}
