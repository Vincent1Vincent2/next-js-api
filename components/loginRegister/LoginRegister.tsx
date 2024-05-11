"use client";
import { useState } from "react";
import { logInUser, registerUser } from "../../apiCalls/users";

interface LoginProps {
  togglePop: () => void;
  isRegister: boolean;
  setIsRegister: (isRegister: boolean) => void;
}

export function LoginRegister(props: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (props.isRegister) {
        const response = await registerUser(username, password);
        if (response?.status === 400) {
          setErrorMessage("Username or Password is invalid");
        } else if (response?.status === 409) {
          setErrorMessage("Username is taken");
        } else {
          props.togglePop();
        }
      } else {
        await logInUser(username, password);
        props.togglePop();
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        setErrorMessage("Username or Password is missing");
      } else if (error.response?.status === 401) {
        setErrorMessage("Username Not Found");
      } else if (error.response?.status === 409) {
        setErrorMessage("Username is taken");
      } else {
        setErrorMessage("An error occurred during the operation.");
      }
    }
  };

  const handleToggleForm = () => {
    props.setIsRegister(!props.isRegister);
  };

  return (
    <div className="box">
      <button className="close-button" onClick={props.togglePop}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">{props.isRegister ? "Register" : "Login"}</button>
      </form>
      {errorMessage && (
        <div className="error-message">
          <p className="text-red-700 font-bold">{errorMessage}</p>
        </div>
      )}
      <p className="cursor-pointer hover:underline" onClick={handleToggleForm}>
        {props.isRegister ? "Sign In" : "Register"}
      </p>
    </div>
  );
}
