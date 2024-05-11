"use client";
import { useQuery } from "@tanstack/react-query";
import { authenticateUser } from "../../apiCalls/users";
import AdminHeader from "./AdminHeader";
import GuestHeader from "./GuestHeader";
import UserHeader, { User } from "./UserHeader";

export default function Header() {
  const response = useQuery<User>({
    queryKey: ["auth"],
    queryFn: authenticateUser,
  });

  if (typeof response.data === "string") {
    return (
      <>
        <GuestHeader />
      </>
    );
  }

  if (response.data && response.data.isAdmin !== false) {
    return (
      <>
        <UserHeader />
      </>
    );
  }

  if (response.data && response.data.isAdmin === true) {
    return (
      <>
        <AdminHeader />
      </>
    );
  }
}
