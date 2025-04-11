import Cartbar from "./CartBar";
import { useState } from "react";
import Inventory from "./Inventory";
import styles from "./modules/ShoppingPage.module.css";

const ShoppingPage = () => {
    const [inCart, setInCart] = useState(['']);
    function handleInCart(item){
        setInCart([
            ...inCart,
            {item}
        ])
    }
    return (
        <div data-testid="entered-store" >
            <h1>Welcome in!</h1>
            <div className={styles.shoppingPageContent}>
                <Cartbar cartItems={inCart} />
                <Inventory updateCartItems={handleInCart}/>
            </div>
        </div>
    )
}

export default ShoppingPage;