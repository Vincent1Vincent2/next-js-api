"use client";
import { useEffect } from "react";
import PostList from "../../components/posts/Posts";

export default function Home() {
  useEffect(() => {
    let storedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    // Create a new link element for the favicon
    const faviconLink = document.createElement("link");

    // Set the rel attribute to "icon"
    faviconLink.rel = "icon";

    // Set the href attribute to the data URI containing the SVG icon
    faviconLink.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💫</text></svg>";

    // Append the link element to the document head
    document.head.appendChild(faviconLink);

    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  return (
    <main>
      <PostList />
    </main>
  );
}
