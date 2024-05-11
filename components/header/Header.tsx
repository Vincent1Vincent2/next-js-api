"use client";
import { useQuery } from "@tanstack/react-query";
import { getLoggedInUser } from "../../apiCalls/users";
import AdminHeader from "./AdminHeader";
import GuestHeader from "./GuestHeader";
import UserHeader, { User } from "./UserHeader";

export default function Header() {
  const response = useQuery<User[]>({
    queryKey: ["user"],
    queryFn: getLoggedInUser,
  });

  if (response.data === undefined) {
    return (
      <>
        <GuestHeader />
      </>
    );
  }

  if (response.data[0] && response.data[0].isAdmin !== true) {
    return (
      <>
        <UserHeader />
      </>
    );
  }

  if (response.data[0] && response.data[0].isAdmin === true) {
    return (
      <>
        <AdminHeader />
      </>
    );
  }
}
