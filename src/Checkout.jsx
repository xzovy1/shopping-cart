import { Link, useLocation } from "react-router-dom";

const Checkout = () => {
    const cart = useLocation().state.cartItems;
    
    console.log(cart)
    return (
        <>
            <h1>Confirm your order</h1>
            <ul>
                {cart.map(item => <li key={item.id}>{item.title} x{item.quantity}</li>)}
            </ul>
            <div>
                Forget something?
                <Link to="/shopping-page" state={{cart}}> Return to Shopping Page</Link>
            </div>
        </>
    )
}

export default Checkout;