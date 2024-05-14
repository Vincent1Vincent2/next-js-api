import { useQuery } from "@tanstack/react-query";
import { authenticateUser } from "../../apiCalls/users";
import AdminHeader from "./AdminHeader";
import GuestHeader from "./GuestHeader";
import UserHeader from "./UserHeader";

export default function Header() {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: authenticateUser,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred:" + error.message;

  // Then, handle the data presence
  if (typeof user !== "object") {
    // If there's no data or data is empty, show the guest header
    return <GuestHeader />;
  }

  // Now, handle the user data
  const currentUser = user[0];

  if (currentUser.isAdmin) {
    // If the user is an admin, show the admin header
    return <AdminHeader />;
  } else {
    // If the user is not an admin, show the user header
    return <UserHeader />;
  }
}
