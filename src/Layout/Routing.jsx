import Home from "../pages/Home";
import EventCategory from "../pages/EventCategory";
import AddEvent from "../pages/AddEvent";
import EventList from "../pages/EventList";

const Routing = [
  { path: "/", element: Home },
  { path: "/event-category", element: EventCategory },
  { path: "/event-category/:id", element: EventCategory },
  { path: "/add-event", element: AddEvent },
  { path: "/add-event/:id", element: AddEvent },
  { path: "/events", element: EventList }
];

export default Routing;
