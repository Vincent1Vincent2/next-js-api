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

export async function createNewPost(
  title: string,
  content: string,
  price: number,
  imageId?: string,
  imagesContainer?: string[]
) {
  const postData = { title, content, imageId, price, imagesContainer };
  const response = await axios.post("/api/posts", postData);
  if (response.status === 201) {
    let post = response.data;
    location.replace(`/posts/${post._id}`);
    return response.data;
  }
}

export async function getPosts() {
  const response = await axios.get("/api/posts");
  return response.data;
}

export async function getPost(id: string | undefined) {
  const response = await axios.get(`/api/posts/${id}`);
  return response.data;
}

export async function getUserPosts() {
  const response = await axios.get("/api/users/posts");
  if (response.status === 200) {
    return response.data;
  }
}

export async function deletePost(id: string | undefined) {
  const response = await axios.delete(`/api/posts/${id}`);

  if (response.status === 200) {
    location.replace("/");
  }
}
