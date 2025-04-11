import Cartbar from "./CartBar";
import { useState } from "react";
import Inventory from "./Inventory";
import styles from "./modules/ShoppingPage.module.css";

const ShoppingPage = () => {
    const [inCart, setInCart] = useState([]);
    const [itemsLoaded, setItemsLoaded] = useState(null);
    function handleInCart(item){
        setInCart([
            ...inCart,
            {item}
        ])
    }
    return (
        <div data-testid="entered-store" >
            <div className={styles.header}>
            <h1>Welcome in!</h1>
            <p>{!itemsLoaded ? '' : itemsLoaded + " items loaded"}</p>

            </div>
            <div className={styles.shoppingPageContent}>
                <Cartbar cartItems={inCart} />
                <Inventory updateCartItems={handleInCart} updateLoadedItems={setItemsLoaded}/>
            </div>
        </div>
    )
}

export default ShoppingPage;