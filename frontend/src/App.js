import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import EventsPage, { loader } from "./pages/Events";
import EventDetailPage from "./pages/EventDetail";
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
              loader: () => loader(), // runs the function on page load
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
