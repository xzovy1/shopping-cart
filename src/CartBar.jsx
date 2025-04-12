import { Link } from 'react-router-dom';
import styles from './modules/Cartbar.module.css'
const Cartbar = ({cartItems}) => {
    console.log(cartItems.map(item=>console.log(item.title)))
    return(
        <div data-testid="cart-bar" className={styles.cartBar}>
            <div className={styles.cart}>
                <h3>Your Cart:</h3> 
                {
                (cartItems.length == 0) ? 
                    <p>Looks like the cart is empty!</p>  
                : <>
                    <ul>
                        {cartItems.map((item, index) => {return <li key={index}>{item.item.title}</li>})}
                    </ul>
                    <button className={styles.checkoutButton}>Checkout</button>
                </>
                }     
            </div>
        </div>
    )
}

export default Cartbar;
