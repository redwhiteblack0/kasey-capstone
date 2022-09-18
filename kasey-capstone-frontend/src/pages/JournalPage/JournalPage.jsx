import {useEffect, useState} from "react";
import axios from "axios";

import CreateJournalEntry from "../../components/CreateJournalEntry";
import MoodChart from "../../components/MoodChart";

const JournalPage = () => {
    const [showCreateEntry, setShowCreateEntry] = useState(false);
    const [journalEntries, setJournalEntries] = useState([]);
    useEffect(() => {
        const getJournalEntries = async () => {
            const response = await axios.get("http://localhost:8000/journal/entries");
            console.log("Entries: ", response.data);

            setJournalEntries(response.data.entries);
        }

        getJournalEntries();
    }, [])

    const renderJournalEntries = (entries) => {
        return entries.map((entry, i) => {
            return (
                <div key={`journal-entry-${entry.id}`}>
                    <p>Title: {entry.title}</p>
                    <p>Description: {entry.description}</p>
                    <p>Date Created: {entry.date_created}</p>
                    <p>Current Mood: {entry.current_mood}</p>
                </div>
            )
        })
    }
    return (
        <div>
            <div>
                <h1>Journal</h1>
            </div>
            <div>
                <button onClick={() => setShowCreateEntry(!showCreateEntry)}>{showCreateEntry ? "Cancel" : "Create"}</button>
            </div>
            {showCreateEntry &&
                <CreateJournalEntry />
            }
            <div>
                <h2>Previous Entires</h2>
                <div>
                    {journalEntries ?
                        renderJournalEntries(journalEntries) :
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                </div>
                <div>
                    <h2>Mood Chart</h2>
                    {journalEntries ?
                        <MoodChart /> :
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default JournalPage;