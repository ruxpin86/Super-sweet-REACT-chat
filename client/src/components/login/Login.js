import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Auth from "../../utils/auth";
// import { LOGIN_USER } from "../../utils/mutations";
// import { useMutation } from "@apollo/client";
import { Collapse } from "react-collapse";
import { loginUser } from "../../utils/API";

import "./login.css";

export default function Login(props) {
  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
  });
  const [validated] = useState(false);

  const [open, setOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setloginFormData({ ...loginFormData, [name]: value });
  };
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    // handleSubmit(async (submitData) => {
    // console.log(submitData);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      // const { data } = await login({
      //   variables: { ...submitData },
      // });
      // Auth.login(data.login.token);
      const response = await loginUser(loginFormData);
      if (!response.ok) {
        throw new Error("something went terribly wrong.");
      }
      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
      navigate("/chat");
    } catch (err) {
      console.error(err);
    }

    setloginFormData({
      email: "",
      password: "",
    });
    // };
  };

  return (
    <>
      <h2 className="main-page-form" onClick={() => setOpen(!open)}>
        Login
      </h2>
      <Collapse isOpened={open}>
        <br></br>
        <form
          className="login-form"
          noValidate
          validated={validated}
          onSubmit={onSubmit}
        >
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={loginFormData.email}
            // {...register("email", { required: true })}
            onChange={handleInputChange}
            required
          />
          {/* {errors.email && <p>Email is required</p>} */}
          <label>Password</label>
          <input
            value={loginFormData.password}
            type="password"
            name="password"
            // {...register("password", { required: true })}
            onChange={handleInputChange}
          />
          {/* {errors.password && <p>Password is required</p>} */}
          <Link to="/chat">
            <button
              disabled={!(loginFormData.email && loginFormData.password)}
              className="login-btn"
              type="submit"
            >
              Login
            </button>
          </Link>
        </form>
      </Collapse>
    </>
  );
}
