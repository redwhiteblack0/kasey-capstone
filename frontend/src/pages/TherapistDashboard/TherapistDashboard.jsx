import {useEffect, useState} from "react";
import axios from "axios";

const TherapistDashboard = () => {
    const [clientsData, setClientsData] = useState([]);

    useEffect(() => {
        const getUserJournals = async () => {
            const response = await axios.get("http://localhost:8000/therapist/journals");
            console.log("All journals: ", response.data);
            
            setClientsData(response.data.clients);
        }

        getUserJournals();
    }, [])

    const renderJournals = (journals) => {
        return journals.map(journal => {
            return (
                <div key={`journal-${journal.title}`}>
                    <p>Title: {journal.title}</p>
                    <p>Mood: {journal.current_mood}</p>
                </div>
            )
        })
    }

    const renderClients = (clients) => {
        return clients.map((client) => {
            return (
                <div key={`client-${client.user_id}`}>
                    <p>Client: {client.first_name} {client.last_name}</p>
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