import axios from "axios";

export interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

export async function authenticateUser() {
  const response = await fetch("/api/authenticate", {
    method: "GET",
  });
  if (response) {
    const authenticated = await response.json();
    return authenticated;
  }
}

export async function logInUser(username: string, password: string) {
  const signInDetails = { username, password };
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInDetails),
  });
  if (response.ok) {
    window.location.reload();
    return response;
  }
}

export async function registerUser(username: string, password: string) {
  const signInDetails = { username, password };
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signInDetails),
  });
  if (response.status === 200) {
    window.location.reload();
    return response;
  }
}

export async function logOutUser() {
  const response = await fetch("/api/logout", {
    method: "POST",
  });
  if (response) {
    window.location.reload();
    return response;
  }
}

export async function getAllUsers() {
  const response = await axios.get("/api/users");
  return response.data;
}

export async function giveAdmin(id: string | undefined) {
  const response = await axios.put(`/api/admin/${id}`);
  if (response.status === 200) {
    location.reload();
    return response.data;
  }
}

export async function deleteUser(id: string | undefined) {
  const response = await axios.delete(`/api/admin/${id}`);
  if (response.status === 200) {
    location.reload();
    return response.data;
  }
}
