import axios from "axios";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: string | undefined;
  imageId?: string | undefined;
  price?: number;
  username: string | undefined;
  imagesContainer: string[];
}

export async function getPosts() {
  const response = await axios.get("/api/posts");
  return response.data;
}

export async function getPost(id: string | undefined) {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data;
}
