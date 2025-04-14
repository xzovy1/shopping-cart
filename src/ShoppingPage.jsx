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
            //if in cart, update the item
            if(e.id === item.id){
                return {quantity: e.quantity++, ...e} //update quantity
            }
            // if not in cart it's returning an arr with the single item in it.
            // i want to return an array with the cart in it
            else if(e.id !== item.id){
                return item
            }
        }
        
    )) 
    }
    inCart.map(e => e.id == item.id ? updateQuantity() : addToCart())

    // updateQuantity();
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