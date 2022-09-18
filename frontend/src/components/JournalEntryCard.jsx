import React from "react";
import "./styles/journalEntryCard.css";

const JournalEntryCard = ({entry}) => {
    return (
        <div key={`journal-entry-${entry.id}`} className={"entryCard"}>
            <p className={"entryCard-title"}>Title: {entry.title}</p>
            <p className={"entryCard-description"}>Description: {entry.description}</p>
            <p className={"entryCard-date"}>Date Created: {entry.date_created}</p>
            <p className={"entryCard-weather"}>Current Weather: {entry.current_weather}</p>
            <p className={"entryCard-mood"}>Current Mood: {entry.current_mood}</p>
        </div>
    )
}

export default JournalEntryCard;