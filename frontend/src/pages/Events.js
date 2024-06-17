import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

export default function EventsPage() {
  const response = useLoaderData();
  const events = response.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw { message: "Could not fetch events." };
  } else {
    return response;
  }
}
