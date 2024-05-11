"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { authenticateUser } from "../apiCalls/users";

export function Home() {
  const {
    isLoading,
    error,
    data: auth,
  } = useQuery<boolean | undefined>({
    queryKey: ["auth"],
    queryFn: authenticateUser,
  });

  useEffect(() => {
    let storedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.defer = true;
    // Create a new link element for the favicon
    const faviconLink = document.createElement("link");

    // Set the rel attribute to "icon"
    faviconLink.rel = "icon";

    // Set the href attribute to the data URI containing the SVG icon
    faviconLink.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥄</text></svg>";

    // Append the link element to the document head
    document.head.appendChild(faviconLink);

    document.head.appendChild(script);

    if (storedTheme) {
      document.documentElement.setAttribute("data-theme", storedTheme);
    }
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#FCD53F"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );

  if (error) return "An error has occurred:" + error.message;

  if (auth === false)
    return (
      <div className="flex flex-wrap justify-center gap-5 py-10 mx-2">hi</div>
    );
}

export default Home;
