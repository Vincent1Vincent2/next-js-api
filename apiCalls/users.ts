import axios from "axios";

export async function loginUser(username: string, password: string) {
  const signInDetails = { username, password };
  const response = await axios.post("/api/login", signInDetails);
  if (response.status === 200) {
    location.reload();
    return response.data;
  }
}

export async function getAllUsers() {
  const response = await axios.get("/api/users");

  if (response.status === 200) {
    return response.data;
  }
}
export async function getLoggedInUser() {
  const response = await axios.get("/api/authenticate");
  if (response.status === 200) {
    return response.data;
  }
}
export async function logOutUser() {
  const response = await axios.post("/api/logout");
  if (response.status === 204) {
    location.reload();
    return response.data;
  }
}

export async function giveAdmin(id: string | undefined) {
  const response = await axios.put(`/api/${id}`);

  if (response.status === 200) {
    location.reload();
    return response.data;
  }
}

export async function deleteUser(id: string | undefined) {
  const response = await axios.delete(`/api/${id}`);

  if (response.status === 204) {
    location.reload();
    return response.data;
  }
}
export async function registerUser(username: string, password: string) {
  const signUpDetails = { username, password };
  const response = await axios.post("/api/register", signUpDetails);

  if (response.status === 200) {
    return response.data;
  }
}
