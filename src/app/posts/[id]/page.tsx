"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Post, getPost } from "../../../../apiCalls/posts";
import { User, authenticateUser } from "../../../../apiCalls/users";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const response = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: authenticateUser,
  });
  const {
    isLoading,
    error,
    data: post,
  } = useQuery<Post>({
    queryKey: ["post"],
    queryFn: () => getPost(id),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred:" + error.message;

  return (
    <main className="bg-[#F4F4F5] p-2 shadow rounded-lg container flex flex-col">
      <p>{post?.title}</p>
    </main>
  );
}
