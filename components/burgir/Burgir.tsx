"use client";
import Link from "next/link";
import { useState } from "react";
import { logOutUser } from "../../apiCalls/users";

export default function Burgir() {
  const [drawer, setDrawer] = useState(true);

  const handleDrawerToggle = () => {
    setDrawer(!drawer);
    document.body.classList.toggle("overflow-y-hidden");
  };

  return (
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
  );
}
