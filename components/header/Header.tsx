"use client";

import { useQuery } from "@tanstack/react-query";
import { authenticateUser } from "../../apiCalls/users";
import { User } from "./AdminHeader";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";

export default function Header() {
  const response = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: authenticateUser,
  });

  console.log(response.data);

  if (response.data === undefined) {
    return (
      <>
        <GuestHeader />
      </>
    );
  }

  if (response.data) {
    return (
      <>
        <UserHeader />
      </>
    );
  }

  /*   if (response[0] && response[0].isAdmin === true) {
    return (
      <>
        <AdminHeader />
      </>
    );
  } */
}
