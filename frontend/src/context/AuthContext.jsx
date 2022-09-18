import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

import {API_BASE_URL} from "../config/api";

const AuthContext = createContext();

export default AuthContext;

function setUserObject(user) {
  if (!user) {
    return null;
  }
  return user;
}

export const AuthProvider = ({ children }) => {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const decodedUser = userToken ? jwtDecode(userToken) : null;
  console.log("Decoded user: ", decodedUser);
  const [token, setToken] = useState(userToken);
  const [user, setUser] = useState(setUserObject(decodedUser ? decodedUser.data: null));
  const [isServerError, setIsServerError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (registerData) => {
    try {
      let finalData = {
        username: registerData.username,
        password: registerData.password,
        email: registerData.email,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        user_city: registerData.user_city,
        role: registerData.role
      };
      let response = await axios.post(`${API_BASE_URL}/register/`, finalData);
      console.log("Successful registration! Log in to access token");
        setIsServerError(false);
        navigate("/login");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const loginUser = async (loginData) => {
    try {
      // let response = await axios.post(`${BASE_URL}/login/`, loginData);
      // if (response.status === 200) {
      //   localStorage.setItem("token", JSON.stringify(response.data.access));
      //   setToken(JSON.parse(localStorage.getItem("token")));
      //   let loggedInUser = jwtDecode(response.data.access);
      //   console.log("User decoded: ", loggedInUser);
      //   setUser(setUserObject(loggedInUser.data));
      //   setIsServerError(false);
      //   navigate("/");
      // } else {
      //   navigate("/register");
      // } 
      let response = await axios.post(`${API_BASE_URL}/login/`, loginData);
      localStorage.setItem("token", JSON.stringify(response.data.access));
        setToken(JSON.parse(localStorage.getItem("token")));
        let loggedInUser = jwtDecode(response.data.access);
        console.log("User decoded: ", loggedInUser);
        setUser(setUserObject(loggedInUser.data));
        setIsServerError(false);
        navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setIsServerError(true);
      navigate("/register");
    }
  };

  const logoutUser = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      navigate("/");
    }
  };

  const contextData = {
    user,
    token,
    loginUser,
    logoutUser,
    registerUser,
    isServerError,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
