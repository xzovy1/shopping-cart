import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styles from './modules/CartBar.module.css';
import { ShopContext } from './ShoppingPage';

const CartBar = () => {
    const {inCart} = useContext(ShopContext);

    function loadCart(cart){
       return cart.map((item, index) => {
            return <li key={index} data-testid="item-added">
                   <p>{item.title}</p> <p data-testid='quantity'>x{item.quantity}</p>
                 </li>})
    }
    return(
        <div data-testid="cart-bar" className={styles.CartBar}>
            <div className={styles.cart}>
                <h3>Your Cart:</h3> 
                {
                    (inCart.length == 0) 
                    ?
                        ( <p>Looks like the cart is empty!</p> )     
                    :
                        <>
                            <ul>
                                {loadCart(inCart)}
                            </ul>
                            <Link to="/checkout" state={{inCart}}><button className={styles.checkoutButton} data-testid="checkout-button">Checkout</button></Link>
                        </>
                }
            </div>
        </div>
    )
}

export default CartBar;
