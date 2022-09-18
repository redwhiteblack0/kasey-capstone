import {useEffect, useState} from "react";
import axios from "axios";

import JournalEntryCard from "../../components/JournalEntryCard";
import CreateJournalEntry from "../../components/CreateJournalEntry";
import MoodChart from "../../components/MoodChart";

import {API_BASE_URL} from "../../config/api";

const ClientJournalPage = () => {
    const [showCreateEntry, setShowCreateEntry] = useState(false);
    const [journalEntries, setJournalEntries] = useState([]);
    useEffect(() => {
        const getJournalEntries = async () => {
            const response = await axios.get(`${API_BASE_URL}/journal/entries`);
            console.log("Entries: ", response.data);

            setJournalEntries(response.data.entries);
        }

        getJournalEntries();
    }, [])

    const renderJournalEntries = (entries) => {
        return entries.map((entry, i) => {
            return (
                <JournalEntryCard entry={entry} />
            )
        })
    }
    return (
        <div>
            <div>
                <h1>My Journal</h1>
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
                        <MoodChart moods={journalEntries.map(({current_mood}) => current_mood)} /> :
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ClientJournalPage;