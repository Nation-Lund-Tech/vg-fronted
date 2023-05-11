import { useParams } from "react-router-dom";
import Layout from "../components/Layout";

export default function EditEvent() {

    const { eventId } = useParams<{ eventId: string }>();

    return (
        <Layout>
            <h1>Edit event {eventId}</h1>
        </Layout>
    );
}