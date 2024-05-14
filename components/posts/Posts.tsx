"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../../apiCalls/posts";

function ProductsList() {
  const [products, setProducts] = useState<Post[] | []>();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="">Products</h1>

      {products?.map((p) => (
        <div key={p._id}>
          <p>{p.title}</p>
          <p>{p.price} SEK</p>
          <img width={260} src={`api/image/${p.imageId}`} alt="Post Image" />
        </div>
      ))}
    </div>
  );
}

export default ProductsList;
