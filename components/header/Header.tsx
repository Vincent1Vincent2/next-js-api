"use client";
import { useQuery } from "@tanstack/react-query";
import { authenticateUser } from "../../apiCalls/users";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";

export default function Header() {
  const {
    isLoading,
    error,
    data: auth,
  } = useQuery<boolean | undefined>({
    queryKey: ["auth"],
    queryFn: authenticateUser,
  });

  if (auth === false) {
    return (
      <>
        <GuestHeader />
      </>
    );
  }

  if (auth) {
    return (
      <>
        <UserHeader />
      </>
    );
  }
}
