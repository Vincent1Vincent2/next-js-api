"use client";
import { useState } from "react";
import { authenticateUser, logInUser } from "../../apiCalls/users";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trim the username and password
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      await logInUser(trimmedUsername, trimmedPassword);
      await authenticateUser();
    } catch (error) {
      console.error("Error signing in");
    }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="input"
          type="password"
          value={password}
          placeholder="Lösenord"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="loginButton" type="submit">
          Logga In
        </button>
      </form>
    </div>
  );
}
