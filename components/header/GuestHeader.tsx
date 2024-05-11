import Link from "next/link";
import { useState } from "react";
import { LoginRegister } from "../loginRegister/LoginRegister";

export default function GuestHeader() {
  const [seen, setSeen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  function togglePop() {
    setSeen(!seen);
  }

  function handleToggleForm() {
    setIsRegister(!isRegister);
  }

  return (
    <header className="flex flex-row p-4 border-b-2 border-gray-400">
      <Link href={"/"}>
        <h1 className="text-blue-600 font-bold text-4xl lg:text-5xl max-sm:text-xl hover:cursor-pointer">
          Big sales
        </h1>
      </Link>
      <span className="flex-1"></span>
      <nav>
        <div className=" flex gap-5">
          <button
            onClick={togglePop}
            className={
              "border-b-2 border-transparent hover:border-b-2 h-10 w-24 hover:border-gray-400"
            }
          >
            Login
          </button>
          <button
            onClick={togglePop}
            className={
              "hover:border-b-2 hover:border-gray-400  h-10 w-24 border-2"
            }
          >
            Register
          </button>
          {seen ? (
            <LoginRegister
              togglePop={togglePop}
              isRegister={isRegister}
              setIsRegister={handleToggleForm}
            />
          ) : null}
        </div>
      </nav>
    </header>
  );
}
