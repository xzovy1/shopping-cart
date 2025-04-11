import styles from './modules/Cartbar.module.css'
const Cartbar = ({cartItems}) => {
    
    return(
        <div data-testid="cart-bar" className={styles.cartBar}>
            <div className={styles.cart}>
                <h3>Your Cart:</h3> 
                {
                (cartItems.length == 0) ? 
                    <p>Looks like the cart is empty!</p>  
                : <>
                    <ul>
                        <li>test</li>
                    </ul>
                    <button className={styles.checkoutButton}>Checkout</button>
                </>
                }     
            </div>
        </div>
    )
}

export default Cartbar;
