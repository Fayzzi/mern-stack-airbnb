import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../Components/Context/UserContext/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const [yesDirect, redirect] = useState(false);
  const [emptyfields, setemptyfield] = useState([]);

  const checkValidity = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/login", {
        email,
        password,
      });

      if (response.data.success) {
        setUser(response.data.registered);
        redirect(true);
        setError("");
        setemptyfield([]);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found");
      }
      if (error.response && error.response.status === 401) {
        setError("Password is incorrect");
      }
      if (error.response.status === 400 && error.response.data.emptyfields) {
        setError("Fields need to be filled");
        setemptyfield(error.response.data.emptyfields);
      }
    }
  };

  if (yesDirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="grow mt-10 items-center justify-center flex">
      <div className="mb-60  flex-col flex gap-5  max-w-md  p-2">
        <h1 className="text-center mb-3 font-bold text-2xl">Login</h1>
        <form onSubmit={checkValidity} className="max-w-md">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="username"
            className={
              emptyfields.includes("email")
                ? "border border-solid border-red-600 error"
                : ""
            }
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className={
              emptyfields.includes("password")
                ? "border-[4px] border-solid border-red-600 error"
                : ""
            }
          />
          <button className="w-full bg-primary p-2 rounded-lg text-white">
            Login
          </button>
          {error && <div className="text-red-600 mt-1">{error}</div>}
          <div className="mt-1">
            <span className="p-1">Don't have an account?</span>
            <Link to={"/signup"} className="text-blue-400">
              Register here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
