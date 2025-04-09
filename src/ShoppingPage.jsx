import Cartbar from "./Cart";
import { useState } from "react";
import Inventory from "./Inventory";

const ShoppingPage = () => {
    const [inCart, setInCart] = useState([]);

    return (
        <div data-testid="entered-store">
        <h1>Welcome in!</h1>
        <Cartbar quantity={inCart.length} />
        <Inventory />
        </div>
    )
}

export default ShoppingPage;