import App from "./App";
import Checkout from "./Checkout";
import ShoppingPage from "./ShoppingPage";
import OrderComplete from "./OrderComplete";

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
    },
    {
        path: "order-complete",
        element: <OrderComplete/>
    }
];
export default routes;