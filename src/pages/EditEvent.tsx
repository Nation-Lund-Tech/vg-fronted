import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { ThankEvent, WorkEvent } from "../Common/Types";


const { eventId } = useParams<{ eventId: string }>();

const fetchWorkEvents = async (): Promise<WorkEvent> => {
    let workEvent: WorkEvent;
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/WorkEvent/id/${eventId}`);
        workEvent = await response.json();
        return workEvent;
    } catch (error) {
        console.error('Error fetching data:', error);
        return {} as WorkEvent;
    }
}

const fetchThankEvents = async (): Promise<ThankEvent> => {
    let thankEvent: ThankEvent;
    try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/ThankEvent/id/${eventId}`);
        thankEvent = await response.json();
        return thankEvent;
    } catch (error) {
        console.error('Error fetching data:', error);
        return {} as ThankEvent;
    }
}

export default function EditEvent() {
    const [event, setEvent] = useState({} as Event); // [state, setState

    // get the event from the id
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/Event/${eventId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                setEvent(data);
            });
    }, [eventId]);


    return (
        <Layout>
            {/* show all the info of the event and make it editable */}
            
        </Layout>
    );
}