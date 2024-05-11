export async function authenticateUser() {
  const response = await fetch(
    "/api/authenticate",

    {
      method: "GET",
    }
  );
  if (response) {
    const authenticated: boolean | undefined = await response.json();
    return authenticated;
  }
}

export async function registerUser(username: string, password: string) {
  const signUpDetails = { username, password };
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpDetails),
  });
  if (response.ok) {
    window.location.reload();
    return response;
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
