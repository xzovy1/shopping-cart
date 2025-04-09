import Cartbar from "./Cart";
import { useState } from "react";
import Inventory from "./Inventory";
import useItems from "./useItems";

const ShoppingPage = () => {
    const [inCart, setInCart] = useState([]);
    function handleinCart(item){
        console.log(item)
        setInCart([
            ...inCart,
            {item}
        ])
    }

    return (
        <div data-testid="entered-store">
            <h1>Welcome in!</h1>
            <Cartbar quantity={inCart.length} />
            <Inventory itemClickHandler={handleinCart} fetchHook={useItems}/>
        </div>
    )
}

export default ShoppingPage;