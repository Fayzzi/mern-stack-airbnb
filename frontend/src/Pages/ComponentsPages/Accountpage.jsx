import axios from "axios";
import { UserContext } from "../../Components/Context/UserContext/UserContext";
import { useContext } from "react";
export default function Accountpage() {
  const { user, setUser } = useContext(UserContext);
  function logoutmethod() {
    axios.post("/logout").then(() => {
      setUser(null);
    });
  }

  return (
    <div className=" ">
      <div className="flex-col text-center flex gap-5  p-2">
        {user.email}
        <button
          className="bg-primary text-white p-2 rounded-lg"
          onClick={logoutmethod}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
