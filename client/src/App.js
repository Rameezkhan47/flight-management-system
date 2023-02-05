import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Flights from "./compoents/Flights";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./compoents/Login";
import { useEffect } from "react";
import { useState } from "react";
import Navbar from "./compoents/Navbar";
import Reservations from "./compoents/Reservations";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log(resObject);
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  console.log("user is", user);

  return (
    <div>
      <Navbar user={user} />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/flights"
          element={user && <Flights user={user} />}
        />
        <Route
          exact
          path="/reservations"
          element={user && <Reservations user={user} />}
        />
        <Route
          exact
          path="/reservations"
          element={user && <Flights user={user} />}
        />
      </Routes>
    </div>
  );
}
export default App;
