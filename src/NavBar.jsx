import { Link } from "react-router-dom";
import styles from "./modules/NavBar.module.css";

const NavBar = () => {
    return (
        <div className={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/shopping-page">Shop</Link>
            <Link to="/checkout">Cart</Link>
        </div>
    )
}

export default NavBar;