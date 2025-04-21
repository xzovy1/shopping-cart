import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./modules/Checkout.module.css"

const Checkout = () => {
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state?.cartItems || [])
    let handleTotalPrice = cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0,).toFixed(2);
    const [totalPrice, setTotalPrice] = useState(handleTotalPrice);

    useEffect(()=>{
        setTotalPrice(handleTotalPrice)
    },[handleTotalPrice])

    const increment = (item) => {
        setCartItems(
            cartItems.map(e => {
                if(e.id === item.id)return { ...e, quantity: e.quantity + 1}
                else{return e}
                        }))
        }
    const decrement = (item) =>  {
        if(item.quantity == 1){return setCartItems(cartItems.filter(e => e.id !== item.id))}
        setCartItems(
            cartItems.map(e => {
                if(e.id === item.id && e.quantity !== 0)return { ...e, quantity: e.quantity - 1}
                else{return e}
                }
        ))
    }         
    
    return (
        <div data-testid="checkout" className={`${styles.root} body`}>
            <h1>Confirm your order</h1>
            <div className={styles.body}>
                <ul>
                    {cartItems.map(item => 
                    <div key={item.id}>
                        
                        <li key={item.id} className={styles.item}>
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span data-testid="price">${item.price}</span>
                            <div className={styles.quantitySection}>
                                <div className={styles.quantityBtn}>
                                    <button className={styles.increaseBtn}onClick={()=>increment(item)}>+</button>
                                    <button className={styles.decreaseBtn} onClick={()=>decrement(item)}>-</button>
                                </div>
                                <div className={styles.quantityAmount}> x<span data-testid="quantity">{item.quantity}</span></div>
                            </div>
                        </li>
                        <hr />
                        </div>
                    )}
                </ul>
                <h4 data-testid="order-total" className={styles.orderTotal}>Total: ${totalPrice}</h4>
            </div>
               <div> {cartItems.length > 0 ? <Link to="/order-complete"><button>Place Order</button></Link> : ''}</div>
            <div>
                Forget something?
                <Link to="/shopping-page" state={{cartItems}}> Return to Shopping Page</Link>
            </div>
        </div>
    )
}

export default Checkout;