import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, yesReady] = useState(false);
  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          <Navigate to={"/login"} />;
          console.error(error);
        })
        .finally(() => {
          yesReady(true);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready, yesReady }}>
      {children}
    </UserContext.Provider>
  );
}
