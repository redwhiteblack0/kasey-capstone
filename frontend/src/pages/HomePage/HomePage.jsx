import React from "react";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [currentWeather, setCurrentWeather] = useState();

  useEffect(() => {
    console.log("User: ", user);
    console.log("In Home Page");

    // weather
    const getCurrentWeather = async () => {
      console.log("User data: ", user);
      const weatherAPIKey = "f2d6edaf76a08d251081138303dc4d4d0";
      const city = user ? user.city || "Boston" : "Boston";
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=7153eddf8673183aab1b3ea688313beb`);

      console.log("Weather: ", response.data);
      setCurrentWeather(response.data);
    }

    getCurrentWeather();
  }, [token]);
  return (
    <div className="container">
      <div>
        {user ?
          <h1>Hello {user.username}</h1> :
          <h1>Welcome to our app</h1>
        }
      </div>
      <div>
        {currentWeather ?
          <p>Current Weather: {currentWeather.weather[0].description}</p> :
          <p>Getting current weather...</p>
        }
      </div>
      {user &&
        <div>
          <Link to="/journal">
            <h3>My Journal</h3>
          </Link>
        </div>
      }
    </div>
  );
};

export default HomePage;
