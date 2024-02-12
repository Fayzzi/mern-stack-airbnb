import { useContext } from "react";
import { UserContext } from "../../Components/Context/UserContext/UserContext";
import { Navigate } from "react-router-dom";
import Accountpage from "../ComponentsPages/Accountpage";
import AccountNavigation from "./AccountNavigation/AccountNavigation";

export default function AdminPage() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="grow ">
      <AccountNavigation />
      <div className="grow mt-4 max-w-md mx-auto bg-green-50">
        <Accountpage />
      </div>
    </div>
  );
}
