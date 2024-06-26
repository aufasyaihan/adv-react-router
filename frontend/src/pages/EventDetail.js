import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");
  const styles = {
    backgroundColor: "var(--color-gray-900)",
    width: "50%",
    margin: "10px",
    borderRadius: "10px",
    overflow: "hidden",
    height: "600px",
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <div style={styles}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={events}>
            {(loadedEvents) => <EventsList events={loadedEvents} />}
          </Await>
        </Suspense>
      </div>
      <div style={styles}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={event}>
            {(loadedEvent) => <EventItem event={loadedEvent} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

async function loadEvent() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // }); // shows an nearest errorElement set in router
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

async function loadEventDetail(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "Could not fetch event." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

export async function loader({ params }) {
  const id = params.eventId;

  return defer({ event: await loadEventDetail(id), events: loadEvent() });
}

export async function action({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }

  return redirect("/events");
}
