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
    let post: Post = response.data;
    location.replace(`http://localhost:5173/posts/${post._id}`);
    return response.data;
  }
}

export async function getPosts() {
  const response = await axios.get(`/api/posts/`);
  if (response.status === 200) {
    return response.data;
  }
}

export async function getPost(id: string | undefined) {
  const response = await axios.get(`/api/posts/${id}`);
  if (response.status === 200) {
    return response.data;
  }
}

export async function updatePost(
  _id: string | undefined,
  author: string | undefined,
  title: string | undefined,
  content: string | undefined,
  price?: number | undefined,
  imageId?: string | undefined,
  imagesContainer?: string[]
) {
  const postContent = {
    author,
    title,
    content,
    price,
    imageId,
    imagesContainer,
  };
  const response = await axios.put(`/api/posts/${_id}`, postContent);
  if (response.status === 200) {
    let post: Post = response.data;
    location.replace(`http://localhost:5173/posts/${post._id}`);
    return response.data;
  }
}

export async function getUserPosts() {
  const response = await axios.get("/api/posts/users");
  if (response.status === 200) {
    return response.data;
  }
}

export async function deletePost(id: string | undefined) {
  const response = await axios.delete(`/api/posts/${id}`);
  if (response.status === 204) {
    location.replace("http://localhost:5173/");

    return response.data;
  }
}
