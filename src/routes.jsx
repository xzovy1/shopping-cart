import App from "./App";
import Checkout from "./Checkout";
import ShoppingPage from "./ShoppingPage";
import OrderComplete from "./OrderComplete";
import ErrorPage from "./ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
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