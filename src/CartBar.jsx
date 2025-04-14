import { Link, useLocation } from 'react-router-dom';
import styles from './modules/Cartbar.module.css'
const Cartbar = ({cartItems}) => {

    console.log(cartItems)
    return(
        <div data-testid="cart-bar" className={styles.cartBar}>
            <div className={styles.cart}>
                <h3>Your Cart:</h3> 
                {
                (cartItems[0] == undefined) ? 
                    <p>Looks like the cart is empty!</p>  
                : <>
                    <ul>
                        {cartItems.map((item, index) => {
                            return <li key={index} data-testid="item-added">
                                   <p>{item.title}</p> <p data-testid='quantity'>x{item.quantity + 1}</p>
                                 </li>})
                        }
                    </ul>
                    <Link to="/checkout" state={{cartItems}}><button className={styles.checkoutButton} data-testid="checkout-button">Checkout</button></Link>
                  </>
                }     
            </div>
        </div>
    )
}

export default Cartbar;
