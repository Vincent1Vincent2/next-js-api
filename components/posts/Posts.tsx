"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Post, getPosts } from "../../apiCalls/posts";

function PostList() {
  const posts = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <div className="flex flex-wrap justify-center gap-5 py-10 mx-2">
      {posts.data?.map((post) => (
        <Link
          href={`/posts/${post._id}`}
          key={post._id}
          className="cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-gray-400 flex flex-col gap-5"
        >
          {post.imageId ? (
            <img
              width={260}
              src={`api/image/${post.imageId}`}
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
                <p className="text-lg"> {post.price} kr</p>
              ) : (
                <p className="text-lg">FREE</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostList;
