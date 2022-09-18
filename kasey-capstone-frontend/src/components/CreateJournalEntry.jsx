import React from "react";

const CreateJournalEntry = () => {
    return (
        <div>
            <h3>New Journal Entry</h3>
            <form>
                <div>
                    <label>Title: </label>
                    <input 
                        type="text" 
                        name="title"
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <input 
                        type="text" 
                        name="description"
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <input 
                        type="hidden" 
                        name="current_weather"
                        value=""
                    />
                </div>
                <div>
                    <label>Current Mood: </label>
                    <select name="current_mood">
                        <option value="HAPPY">😄</option>
                        <option value="SAD">😞</option>
                    </select>
                </div>
                <div>
                    <button type="button">Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateJournalEntry;