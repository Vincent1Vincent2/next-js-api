"use client";
import { useState } from "react";
import { uploadImage } from "../../../apiCalls/images";
import { createNewPost } from "../../../apiCalls/posts";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = [...images, ...Array.from(event.target.files)];
      setImages(newImages);
      const newImagePreviews = [
        ...imagePreviews,
        ...Array.from(event.target.files).map((file) =>
          URL.createObjectURL(file)
        ),
      ];
      setImagePreviews(newImagePreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const imageIds = await Promise.all(
        images.map((image) => uploadImage(image))
      );
      console.log(imageIds);
      await createNewPost(title, content, price, imageIds[0], imageIds);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="bg-gray-300 border-dotted hover:ring-2 cursor-pointer pt-8 pb-12 file:opacity-0 file:h-0 file:w-0 file:overflow-hidden"
        />
        {imagePreviews.map((preview, index) => (
          <div key={index} className="mt-4">
            <img src={preview} alt="Preview" className="max-w-[260px]" />
          </div>
        ))}

        <label className="sm:w-[300px] md:w-[640px] lg:w-[920px] xl:w-[1080px]">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          ></input>
        </label>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}
