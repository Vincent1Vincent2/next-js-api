import axios from "axios";

export async function uploadImage(image: File | undefined) {
  if (!image) {
    throw new Error("No image provided");
  }

  const formData = new FormData();
  formData.append("image", image);

  const response = await axios.post("/api/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.status === 201) {
    return response.data;
  }
}
export async function getImages() {
  const response = await axios.get("/api/images/"); //Get all images
  if (response.status === 200) {
    return response.data;
  }
}

export async function getImage(id: string | undefined) {
  const response = await axios.get(`/api/images/${id}`); //Get one image
  if (response.status === 201) {
    return response.data;
  }
}

export async function deleteImage(id: string | undefined) {
  const response = await axios.delete(`/api/images/${id}`);
  if (response.status === 200) {
    return response.data;
  }
}
