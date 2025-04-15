import Cartbar from "./CartBar";
import { useState } from "react";
import Inventory from "./Inventory";
import styles from "./modules/ShoppingPage.module.css";
import { useLocation } from "react-router-dom";

const ShoppingPage = () => {

    const [inCart, setInCart] = useState(useLocation().state ? useLocation().state.cartItems : []);
    function handleInCart(item){

        function addToCart(){
        if( inCart.length > 0) return setInCart([...inCart, item])
            else{return setInCart([item])}
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
    console.log(inCart)
    return (
        <div data-testid="entered-store" >
            <div className={styles.header}>
            <h1>Welcome in!</h1>

            </div>
            <div className={styles.shoppingPageContent}>
                <Cartbar cartItems={inCart}/>
                <Inventory updateCartItems={handleInCart} />
            </div>
        </div>
    )
}

export default ShoppingPage;