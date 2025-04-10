import Cartbar from "./Cart";
import { useState } from "react";
import Inventory from "./Inventory";
import useItems from "./useItems";
import styles from "./ShoppingPage.module.css";


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
        <div data-testid="entered-store" >
            <h1>Welcome in!</h1>
            <div className={styles.shoppingPageContent}>
                <Cartbar quantity={inCart.length} />
                <Inventory itemClickHandler={handleinCart} fetchHook={useItems}/>
            </div>
        </div>
    )
}

export default ShoppingPage;