import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export async function loader({ params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch event." }, { status: 500 });
  } else {
    return response;
  }
}
