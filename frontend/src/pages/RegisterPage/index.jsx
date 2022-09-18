import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

import "./index.css";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    user_city: "Boston",
    role: "CLIENT"
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container">
      <div>
        <h1>Registration Form</h1>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className={"inputField"}>
          <label>Username:{" "}</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
        <div className={"inputField"}>
          <label>
            First Name:{" "}
          </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
        </div>
 
        <div className={"inputField"}>
          <label>
            Last Name:{" "}
          </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
        </div>
        <div className={"inputField"}>
          <label>
            Closest City:{" "}
          </label>
            <select name="user_city" value={formData.userCity} onChange={handleInputChange}>
              <option value="Boston">Boston</option>
              <option value="Sacramento">Sacramento</option>
              <option value="London">London</option>
              <option value="Beijing">Beijing</option>
              <option value="Lima">Lima</option>
            </select>
        </div>
 
        <div className={"inputField"}>
        <label>
          Email:{" "}
        </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className={"inputField"}>
          <label>
            Password:{" "}
          </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
        </div>
        <div className={"inputField"}>
          <label>
            Role:{" "}
          </label>
            <select onChange={handleInputChange} value={formData.role} name="role" id="role">
              <option value="THERAPIST">Therapist</option>
              <option value="CLIENT">Client</option>
            </select>
        </div>
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
