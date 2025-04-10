import Cartbar from "./Cart";
import { useState } from "react";
import Inventory from "./Inventory";
import useItems from "./useItems";
import styles from "./modules/ShoppingPage.module.css";


const ShoppingPage = ({cartItems, updateCartItems }) => {
    return (
        <div data-testid="entered-store" >
            <h1>Welcome in!</h1>
            <div className={styles.shoppingPageContent}>
                <Cartbar cartItems={cartItems} />
                <Inventory updateCartItems={updateCartItems} fetchHook={useItems}/>
            </div>
        </div>
    )
}

export default ShoppingPage;