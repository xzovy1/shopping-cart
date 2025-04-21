import { Link } from "react-router-dom";
import styles from "./modules/NavBar.module.css";

const NavBar = (cartItems) => {
    return (
        <div className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/shopping-page">Shop</Link>
            <Link to="/checkout" state={cartItems}>Cart</Link>
        </div>
    )
}

export default NavBar;