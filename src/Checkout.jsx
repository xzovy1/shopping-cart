import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const location = useLocation();
    // const cartItems = location.state?.cartItems || [];
    const [cartItems, setCartItems] = useState(location.state?.cartItems || [])
    function changeQuantity(item, increment){
        if(increment){
            setCartItems(
                
                    cartItems.map(e => {
                        if(e.id === item.id)return { ...e, quantity: e.quantity + 1}
                        else{return e}
                    })
            )
            }
        else{
            setCartItems(
                cartItems.map(e => {
                    if(e.id === item.id)return { ...e, quantity: e.quantity - 1}
                    else{return e}
                })
                )
        }
    }
    return (
        <div data-testid="checkout">
            <h1>Confirm your order</h1>
            <ul>
                {cartItems.map(item => 
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
                <Link to="/shopping-page" state={{cartItems}}> Return to Shopping Page</Link>
            </div>
                {cartItems.length > 0 ? <Link to="/order-complete"><button>Place Order</button></Link> : ''}
        </div>
    )
}

export default Checkout;