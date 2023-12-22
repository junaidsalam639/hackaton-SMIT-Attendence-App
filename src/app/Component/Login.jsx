// pages/login.js
"use client";
import { useState } from "react";
import "./custom.css";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const object = {
    email: email,
    password: password,
  };
  const handlerLogin = () => {
    if (email == "" || password == "") {
      alert("Please All Filed required");
    } else {
      axios
        .post("https://rose-rich-turtle.cyclic.app/addstudent/login", object)
        .then((data) => {
          const token = data.data.data.token;
          console.log(token);
          localStorage.setItem("token", token);
          alert("Login Successfully");
          navigate.push("/pages/students");
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
    }
  };
  return (
    <div className="main ">
      <div className="container12 rounded mx-auto mt-4">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2/2123.png"
          alt="User"
        />
        <div className="span">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="Faiz"
          />
        </div>
        <input
          type="password"
          placeholder="Password"
          className="Faiz"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn-login p-1 mt-10 rounded" onClick={handlerLogin}>
          {" "}
          Login
        </button>
      </div>
    </div>
  );
}
