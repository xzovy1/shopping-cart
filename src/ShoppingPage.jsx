import Cartbar from "./CartBar";
import { useState } from "react";
import Inventory from "./Inventory";
import styles from "./modules/ShoppingPage.module.css";

const ShoppingPage = () => {
    const [inCart, setInCart] = useState([{}]);
    function handleInCart(item){

        function addToCart(){
        if( Object.keys(inCart[0]).length > 0) setInCart([...inCart, item])
            else{setInCart([item])}
        }   

        function updateQuantity(){
            setInCart(
                inCart.map(e => {
                    if(e.id === item.id)return { ...e, quantity: e.quantity + 1}
                    else{return e}
                })
            ) 
        }

    inCart.find(e => e.id == item.id) == undefined ? addToCart() : updateQuantity();
    }
    
    return (
        <div data-testid="entered-store" >
            <div className={styles.header}>
            <h1>Welcome in!</h1>

            </div>
            <div className={styles.shoppingPageContent}>
                <Cartbar cartItems={inCart} />
                <Inventory updateCartItems={handleInCart} />
            </div>
        </div>
    )
}

export default ShoppingPage;