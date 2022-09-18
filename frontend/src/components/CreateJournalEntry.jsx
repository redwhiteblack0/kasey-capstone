import {useEffect, useState} from "react";
import axios from "axios";

const CreateJournalEntry = () => {
    const [inputs, setInputs] = useState({});

    const getCurrentWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=7153eddf8673183aab1b3ea688313beb`);
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
        setInputs(defaultInputs);
    }, [])

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const weather = await getCurrentWeather();
        const postData = {
            ...inputs, 
            current_weather: weather.weather[0].description
        }
        console.log(postData);
      }
    return (
        <div>
            <h3>New Journal Entry</h3>
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
    )
}

export default CreateJournalEntry;