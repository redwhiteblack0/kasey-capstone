import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./index.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container">
      <div className={"loginHeader"}>
        <h2>Login</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className={"inputField"}>
          <label>
            Username:{" "}
          </label>
            <input
              type="text"
              name="username"
              value={formData.username}
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
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
        <Link to="/register">Click to register!</Link>
        <button type="submit" className={"loginButton"}>Login!</button>
      </form>
    </div>
  );
};

export default LoginPage;
