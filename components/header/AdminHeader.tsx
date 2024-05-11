"use client";
import Link from "next/link";
import { logOutUser } from "../../apiCalls/users";
import Burgir from "../burgir/Burgir";

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}

export default function AdminHeader() {
  return (
    <header className="flex flex-row p-4 justify-between h-28 items-center border-b-4">
      <Link href={"/"}>
        <h1 className="text-blue-600 font-bold text-4xl lg:text-5xl max-sm:text-xl hover:cursor-pointer">
          Big sales
        </h1>
      </Link>

      <nav className="flex flex-row gap-5 max-md:hidden">
        <Link href={"/admin"}>
          <p className="border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 text-sm text-center max-sm:text-xs">
            Admin Page
          </p>
        </Link>
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

      <Burgir />
    </header>
  );
}
