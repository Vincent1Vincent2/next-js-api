"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Post, deletePost, getPost } from "../../../../apiCalls/posts";
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
    <div className="mx-5 py-10 flex justify-center flex-col md:flex-row gap-5 items-center ">
      <div className="self-center">
        {post?.imageId ? (
          <div className="flex justify-around gap-5 max-md:flex-col">
            <img src={`/api/image/${post.imageId}`} alt="Post Image" />
            <div className="flex flex-col justify-around max-md:flex-row">
              {post?.imagesContainer
                ? post?.imagesContainer
                    .slice(1)
                    .map((image, index) => (
                      <img
                        width={130}
                        key={index}
                        src={`/api/image/${image}`}
                        alt="post img"
                      />
                    ))
                : null}
            </div>
          </div>
        ) : (
          <div
            className="grid place-items-center border-2"
            style={{ width: 260, height: 260 }}
          >
            NO IMAGE FOUND
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold w-56">{post?.title}</p>
          <p className="w-56">{post?.content}</p>

          {post!.price ? (
            <p className="text-lg">{post!.price} kr</p>
          ) : (
            <p className="text-lg">FREE</p>
          )}
        </div>
        {post?.username ? (
          post?.username === response.data?.[0]?.username ||
          response.data?.[0]?.isAdmin === true ? (
            <div className="flex gap-4 flex-col">
              <p>Seller: {post?.username}</p>
              <div className="flex gap-4 flex-row">
                <button
                  className="text-center bg-red-700 bg-opacity-60 hover:bg-opacity-75 hover:cursor-pointer w-20"
                  onClick={() => deletePost(post?._id)}
                >
                  Delete
                </button>
                <Link
                  className="text-center bg-orange-700 bg-opacity-60 hover:bg-opacity-75 w-20"
                  href={`/edit-post/${post?._id}`}
                >
                  Edit
                </Link>
              </div>
            </div>
          ) : (
            <p>Seller: {post?.username}</p>
          )
        ) : null}
      </div>
    </div>
  );
}
