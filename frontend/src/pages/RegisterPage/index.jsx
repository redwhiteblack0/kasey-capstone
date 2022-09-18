import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

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
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Closest City:{" "}
          <select name="user_city" value={formData.userCity} onChange={handleInputChange}>
            <option value="Boston">Boston</option>
            <option value="Sacramento">Sacramento</option>
            <option value="London">London</option>
            <option value="Beijing">Beijing</option>
            <option value="Lima">Lima</option>
          </select>
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Role:{" "}
          <select onChange={handleInputChange} value={formData.role} name="role" id="role">
            <option value="THERAPIST">Therapist</option>
            <option value="CLIENT">Client</option>
          </select>
        </label>
        <p style={{ fontSize: "12px" }}>
          NOTE: Make this an uncommon password with characters, numbers, and
          special characters!
        </p>
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
