import App from "./App";
import ShoppingPage from "./ShoppingPage";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "shopping-page",
        element: <ShoppingPage />,
    }
];

export default routes;