import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Checkout = () => {
    const location = useLocation();
    const [cartItems, setCartItems] = useState(location.state?.cartItems || [])
    let handleTotalPrice = cartItems.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0,);
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
        <div data-testid="checkout">
            <h1>Confirm your order</h1>
            <ul>
                {cartItems.map(item => 
                    <li key={item.id}>
                        <span>{item.title}</span> <span data-testid="price">${item.price}</span> x <span data-testid="quantity">{item.quantity}</span>
                        <div>
                            <button onClick={()=>increment(item)}>+</button>
                            <button onClick={()=>decrement(item)}>-</button>
                        </div>
                    </li>
                )}
            </ul>
            <div data-testid="order-total">Total: ${totalPrice}</div>
            <div>
                Forget something?
                <Link to="/shopping-page" state={{cartItems}}> Return to Shopping Page</Link>
            </div>
                {cartItems.length > 0 ? <Link to="/order-complete"><button>Place Order</button></Link> : ''}
                
        </div>
    )
}

export default Checkout;