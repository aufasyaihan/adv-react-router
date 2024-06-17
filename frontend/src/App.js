import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            {
              index: true,
              element: <EventsPage />,
              loader: async () => { // runs the function on page load
                const response = await fetch("http://localhost:8080/events");

                if (!response.ok) {
                  //...
                } else {
                  const resData = await response.json();
                  return resData.events;
                }
              },
            },
            {
              path: ":eventId",
              element: <EventDetailPage />,
            },
            {
              path: "new",
              element: <NewEventPage />,
            },
            {
              path: ":eventId/edit",
              element: <EditEventPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
