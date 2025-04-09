import Cartbar from "./Cart";
import { useState } from "react";
import Inventory from "./Inventory";

const ShoppingPage = () => {
    const [inCart, setInCart] = useState([]);
    function handleinCart(item){
        console.log(item)
        setInCart([
            ...inCart,
            {item}
        ])
    }
    console.log(inCart)
    return (
        <div data-testid="entered-store">
            <h1>Welcome in!</h1>
            <Cartbar quantity={inCart.length} />
            <Inventory itemClickHandler={handleinCart} />
        </div>
    )
}

export default ShoppingPage;