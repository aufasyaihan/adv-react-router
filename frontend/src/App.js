import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventLoader } from "./pages/Events";
import EventDetailPage, {
  loader as eventDetailLoader,
} from "./pages/EventDetail";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import Root from "./pages/Root";
import EventsRoot from "./pages/EventsRoot";
import ErrorPage from "./pages/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
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
              loader: eventLoader, // runs the function on page load
            },
            {
              path: ":eventId",
              id: "event-detail",
              loader: eventDetailLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                },
              ],
            },
            {
              path: "new",
              element: <NewEventPage />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
