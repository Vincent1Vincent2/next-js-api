"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Post, deletePost, getUserPosts } from "../../../apiCalls/posts";

export default function UserPosts() {
  const {
    isLoading,
    error,
    data: userPosts,
  } = useQuery<Post[]>({
    queryKey: ["userPosts"],
    queryFn: getUserPosts,
  });

  console.log(userPosts);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred:" + error.message;

  if (!userPosts || userPosts.length === 0) {
    return (
      <div className="flex justify-center my-10">
        <p className="text-xl">No posts made yet.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-5 justify-center mx-5 my-10">
      {userPosts?.map((post) => (
        <div key={post._id}>
          <Link
            href={`/posts/${post._id}`}
            className="cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-gray-400"
          >
            {post!.imageId ? (
              <img
                width={260}
                src={`/api/images/${post!.imageId}`}
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

            <div className="flex flex-col justify-between m-4">
              <div>
                <h2 className="text-2xl font-bold w-56">{post.title}</h2>
              </div>
              <div>
                {post.price ? (
                  <p className="w-20 text-lg">{post.price} kr</p>
                ) : (
                  <p className="text-lg">FREE</p>
                )}
                <p>{post.username}</p>
              </div>
            </div>
          </Link>

          <div className="flex items-center mx-5 gap-2">
            <button
              className="text-center w-28 bg-red-700 bg-opacity-60 hover:bg-opacity-75 hover:cursor-pointer rounded-sm"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
            <Link
              className=" text-center w-28 bg-orange-700 bg-opacity-60 hover:bg-opacity-75"
              href={`/edit-post/${post._id}`}
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
