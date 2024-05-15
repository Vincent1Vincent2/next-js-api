"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Post, deletePost, getPosts } from "../../../apiCalls/posts";
import {
  User,
  authenticateUser,
  deleteUser,
  getAllUsers,
  giveAdmin,
} from "../../../apiCalls/users";

export default function AdminPage() {
  const currentUser = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: authenticateUser,
  });
  const users = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const posts = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const [filter, setFilter] = useState<"users" | "posts">("users");

  if (currentUser.isLoading || users.isLoading || posts.isLoading) {
    return <div>Loading...</div>;
  }

  const currentUserData = currentUser.data;
  const currentUserIsAdmin = currentUserData?.find((user) => user.isAdmin);

  if (currentUserIsAdmin) {
    if (filter === "users") {
      return (
        <div className="pb-10">
          <div className="bg-gray-400 flex justify-around mb-10 h-20 px-10 items-center">
            <h2
              onClick={() => setFilter("users")}
              className="text-2xl font-bold cursor-pointer hover:border-black hover:border-b-2 h-8"
            >
              Users
            </h2>

            <h2
              onClick={() => setFilter("posts")}
              className="cursor-pointer  text-2xl font-bold hover:border-black hover:border-b-2 h-8"
            >
              Posts
            </h2>
          </div>

          <div className="flex flex-row gap-8 flex-wrap justify-center">
            {users.data?.map((u) => (
              <div
                className=" grid place-items-center border-b-2 border-gray-400"
                style={{ width: 300, height: 200 }}
                key={u._id}
              >
                <p>Username: {u.username}</p>
                <p>Admin: {u.isAdmin == false ? "false" : "true"}</p>
                <p>ID:{u._id}</p>
                <div className="flex flex-row gap-8 py-5">
                  <button
                    className="bg-green-700 bg-opacity-60 hover:bg-opacity-75 w-32 hover:cursor-pointer"
                    onClick={() => giveAdmin(u._id)}
                  >
                    {u.isAdmin === false ? "Make Admin" : "Remove Admin"}
                  </button>
                  <button
                    className="bg-red-700 bg-opacity-60 hover:bg-opacity-75 w-32 hover:cursor-pointer"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete User
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    if (filter === "posts") {
      return (
        <main className="pb-10">
          <div className="bg-gray-400 flex justify-around mb-10 h-20 px-10 items-center">
            <h2
              onClick={() => setFilter("users")}
              className="text-2xl font-bold cursor-pointer hover:border-black hover:border-b-2 h-8"
            >
              Users
            </h2>

            <h2
              onClick={() => setFilter("posts")}
              className=" cursor-pointer  text-2xl font-bold hover:border-black hover:border-b-2 h-8"
            >
              Posts
            </h2>
          </div>
          <div className="flex flex-row flex-wrap justify-center items-center gap-10 mx-5">
            {posts.data?.map((p) => (
              <div className="flex flex-col items-start" key={p._id}>
                <Link
                  href={`/posts/${p._id}`}
                  key={p._id}
                  className="cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 flex flex-col gap-5"
                >
                  <div className="self-center border">
                    {p!.imageId ? (
                      <img
                        width={260}
                        src={`api/images/${p!.imageId}`}
                        alt="Post Image"
                      />
                    ) : (
                      <div
                        className="grid place-items-center border-2"
                        style={{ width: 260, height: 260 }}
                      >
                        NO IMAGE FOUND
                      </div>
                    )}
                  </div>
                </Link>
                <p className="text-2xl font-bold w-56">{p.title}</p>
                <p className="w-56">{p.content}</p>
                <div className="flex self-center gap-8 py-5">
                  <button
                    className="text-center w-20 bg-red-700 bg-opacity-60 hover:bg-opacity-75 hover:cursor-pointer"
                    onClick={() => deletePost(p._id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="text-center w-20 bg-orange-700 bg-opacity-60 hover:bg-opacity-75"
                    href={`/edit-post/${p._id}`}
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      );
    }

    if (currentUserData && !currentUserIsAdmin) {
      return (
        <main>
          <h1>Unauthorized</h1>
        </main>
      );
    }

    return null;
  }
}
