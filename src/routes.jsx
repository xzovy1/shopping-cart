import App from "./App";
import Checkout from "./Checkout";
import ShoppingPage from "./ShoppingPage";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "shopping-page",
        element: <ShoppingPage />,
    },
    {
        path: "checkout",
        element: <Checkout />
    }
];
export default routes;