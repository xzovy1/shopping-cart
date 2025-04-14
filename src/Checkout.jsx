import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const inCart = useLocation().state.cartItems;
    const [cart, setCart] = useState(inCart);
    function changeQuantity(item, increment){
        if(increment){
            setCart(
                inCart.map(e => {
                    if(e.id === item.id)return { ...e, quantity: item.quantity + 1}
                    else{return e}
                })
                )
            }
        else{
            setCart(
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
                {cart.map(item => 
                    <li key={item.id}>
                        {item.title} x{item.quantity}
                        <p>
                            <button onClick={()=>changeQuantity(item, true)}>+</button>
                            <button onClick={()=>changeQuantity(item, false)}>-</button>
                        </p>
                    </li>
                )}
            </ul>
            <div>
                Forget something?
                <Link to="/shopping-page" state={{cart}}> Return to Shopping Page</Link>
            </div>
        </>
    )
}

export default Checkout;