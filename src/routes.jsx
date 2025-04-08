import App from "./App";
import Inventory from "./Inventory";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "inventory",
        element: <Inventory />,
    }
];

export default routes;