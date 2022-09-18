import {useEffect, useState} from "react";
import axios from "axios";

import { API_BASE_URL } from "../../config/api";

const TherapistDashboard = () => {
    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        const getUserJournals = async () => {
            const response = await axios.get(`${API_BASE_URL}/therapist/journals`);
            console.log("All journals: ", response.data);
            
            setClientsData(response.data.clients);
        }

        getUserJournals();
    }, [])

    const renderJournals = (entries) => {
        return entries.map(entry => {
            return (
                <div key={`entry-${entry.title}`}>
                    <p>Title: {entry.title}</p>
                    <p>Description: {entry.description}</p>
                    <pre>Content: {entry.content}</pre>
                    <p>My Current Weather: {entry.current_weather}</p>
                    <p>Mood: {entry.current_mood}</p>
                </div>
            )
        })
    }

    const renderClients = (clients) => {
        return clients.map((client) => {
            return (
                <div key={`client-${client.user_id}`}>
                    <p>Client: {client.first_name} {client.last_name}</p>
                    <p>Username: {client.username}</p>
                    {renderJournals(client.journal_entries)}
                </div>
            )
        })
    }

    return (
        <div>
            <div>
                <h1>Therapist Dashboard</h1>
            </div>
            <div>
                {clientsData ?
                    renderClients(clientsData) :
                    <p>Loading...</p>
                }
            </div>
        </div>
    )
}

export default TherapistDashboard;