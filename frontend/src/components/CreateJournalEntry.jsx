import {useEffect, useState} from "react";
import axios from "axios";

import useAuth from "../hooks/useAuth";

import {API_BASE_URL} from "../config/api";

const currentDate = new Date();

const CreateJournalEntry = () => {
    const [user, setUser] = useAuth();
    const [weather, setWeather] = useState("");
    const [inputs, setInputs] = useState({});
    const [submitState, setSubmitState] = useState();

    const getCurrentWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${user.user_city}&appid=7153eddf8673183aab1b3ea688313beb`);
        setWeather(response.data.weather[0].description);
        return response.data;
    }

    const defaultInputs = {
        title: "",
        description: "",
        content: "",
        current_weather: "",
        current_mood: "😄"
    }

    useEffect(() => {
        getCurrentWeather();
        setInputs(defaultInputs);
    }, [])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitState("SUBMITTING");
        const postData = {
            ...inputs, 
            current_weather: weather
        }

        const accessToken = localStorage.getItem("token");
        
        // Headers are third argument
        const response = await axios.post(`${API_BASE_URL}/journal/create`, postData, {
            headers: {
                "Authorization": `Bearer: ${accessToken}`
            },
        });

        console.log(response.data);
        setSubmitState("SUBMITTED");
      }
    return (
        <div>
            {submitState ?
                submitState === "SUBMITTING" ?
                <div>
                    <p>Submitting...</p>
                </div> :
                <div>
                    <p>Journal Entry Submitted</p>
                </div> :
                <div>
                <h3>New Journal Entry</h3>
                <p>Date: {`${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`}</p>
                <p>My current weather in {user.user_city} is: {weather}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title: </label>
                        <input 
                            type="text" 
                            name="title"
                            onChange={handleChange}
                            value={inputs.title || ""}
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <input 
                            type="text" 
                            name="description"
                            onChange={handleChange}
                            value={inputs.description || ""}
                        />
                    </div>
                    <div>
                        <label>Content: </label>
                        <textarea
                            name="content"
                            onChange={handleChange}
                            value={inputs.content || ""}
                        />
                    </div>
                    <div>
                        <label>Current Mood: </label>
                        <select name="current_mood" onChange={handleChange} value={inputs.current_mood || "😄"}>
                            <option value="😄">😄</option>
                            <option value="😞">😞</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}

export default CreateJournalEntry;