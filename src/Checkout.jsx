import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const location = useLocation();
    const cartItems = location.state.cartItems
    console.log(cartItems)
    function changeQuantity(item, increment){
        if(increment){
            setCartItems(
                inCart.map(e => {
                    if(e.id === item.id)return { ...e, quantity: item.quantity + 1}
                    else{return e}
                })
                )
            }
        else{
            setCartItems(
                inCart.map(e => {
                    if(e.id === item.id)return { ...e, quantity: item.quantity - 1}
                    else{return e}
                })
                )
        }
    }
    return (
        <>
            <h1>Confirm your order</h1>
            <ul>
                {cartItems.map(item => 
                    <li key={item.id}>
                        {item.title} x{item.quantity}
                        {/* <p>
                            <button onClick={()=>changeQuantity(item, true)}>+</button>
                            <button onClick={()=>changeQuantity(item, false)}>-</button>
                        </p> */}
                    </li>
                )}
            </ul>
            <div>
                Forget something?
                <Link to="/shopping-page" state={{cartItems}}> Return to Shopping Page</Link>
            </div>
                <Link to="/order-complete"><button>Place Order</button></Link>
        </>
    )
}

export default Checkout;