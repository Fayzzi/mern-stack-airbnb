import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emptyfields, setemptyfield] = useState([]);
  const [direct, setDirect] = useState(false);

  async function checkValidity(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        alert("Registration successful");
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setemptyfield([]);
        setDirect(true);
      } else {
        setError(response.data.message); // Show specific error message from the server
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Email already registered");
      }
      if (error.response.status === 400 && error.response.data.emptyfields) {
        setError("Fields need to be filled");
        setemptyfield(error.response.data.emptyfields);
      }
    }
  }
  if (direct) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="grow flex mt-10 flex-col justify-center items-center">
      <div className="mb-60 flex flex-col max-w-md gap-2  p-2">
        <h1 className="text-center mb-3 font-bold text-2xl">Signup</h1>
        <form onSubmit={checkValidity} className="max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={
              emptyfields.includes("name")
                ? "border border-solid border-red-600 error"
                : ""
            }
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            className={
              emptyfields.includes("password")
                ? "border border-solid border-red-600 error"
                : ""
            }
          />
          <button className="w-full bg-primary p-2 rounded-lg text-white">
            Register
          </button>
          {error && <div className="text-red-600">{error}</div>}
          <p className="custom-text">
            By continuing, you agree to our terms and conditions.
          </p>
        </form>
      </div>
    </div>
  );
}
