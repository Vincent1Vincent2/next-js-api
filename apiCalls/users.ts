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
    console.log(authenticated);
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

export async function logOutUser() {
  const response = await fetch(
    "/api/logout",

    {
      method: "POST",
    }
  );
  if (response.ok) {
    window.location.reload();
    return response;
  }
}
