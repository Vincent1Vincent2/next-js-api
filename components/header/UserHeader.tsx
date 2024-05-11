"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { getLoggedInUser, logOutUser } from "../../apiCalls/users";

export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export default function UserHeader() {
  const response = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });
  const [drawer, setDrawer] = useState(true);

  const handleDrawerToggle = () => {
    setDrawer(!drawer);
    document.body.classList.toggle("overflow-y-hidden");
  };

  return (
    <header className="flex flex-row p-4 justify-between h-28 items-center border-b-4">
      <a href="/">
        <h1 className="text-blue-600 font-bold text-4xl lg:text-5xl max-sm:text-xl hover:cursor-pointer">
          Big sales
        </h1>
      </a>
      {response.data?.map((user) => (
        <p
          className="px-5 text-lg text-center max-sm:text-sm"
          key={user.username}
        >
          Welcome {user.username}!
        </p>
      ))}

      <nav className="flex flex-row gap-5 max-md:hidden">
        <Link href="/my-posts">
          <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-sm text-center max-sm:text-xs">
            My Posts
          </p>
        </Link>
        <Link href="/create-post">
          <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-sm text-center max-sm:text-xs">
            New Post
          </p>
        </Link>
        <Link href="/">
          <button
            className="border-b-2 hover:border-b-2 border-1 border-red-900 hover:border-gray-400 text-sm text-center max-sm:text-xs"
            onClick={logOutUser}
          >
            Sign Out
          </button>
        </Link>
      </nav>

      <div className="flex flex-row-reverse items-center gap-5 md:hidden">
        <div>
          <button onClick={handleDrawerToggle}>
            <p className="text-lg">Menu</p>
          </button>
        </div>

        {!drawer && (
          <div className="absolute top-28 left-0 w-full h-full z-10 overflow-x-hidden bg-black bg-opacity-85">
            <div className="absolute top-0 right-0 p-4">
              <button onClick={handleDrawerToggle}>
                <p className="text-xl text-white">X</p>
              </button>
              <nav className="flex flex-col items-end px-5 py-5 gap-5 absolute -translate-x-20 translate-y-5 z-10">
                <Link onClick={handleDrawerToggle} href="/my-posts">
                  <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-lg text-center w-20 text-white">
                    My Posts
                  </p>
                </Link>
                <Link onClick={handleDrawerToggle} href="/create-post">
                  <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-lg text-center w-20 text-white">
                    New Post
                  </p>
                </Link>
                <Link onClick={handleDrawerToggle} href="/">
                  <button
                    className="border-b-2 hover:border-b-2 border-1 border-red-900 hover:border-gray-400 text-lg text-center w-20 text-white"
                    onClick={logOutUser}
                  >
                    Sign Out
                  </button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
