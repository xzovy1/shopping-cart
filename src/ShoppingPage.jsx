import CartBar from "./CartBar";
import { useState, useEffect } from "react";
import Inventory from "./Inventory";
import styles from "./modules/ShoppingPage.module.css";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const ShoppingPage = () => {
    let location = useLocation();
    const [inCart, setInCart] = useState([]);
    const [searchBar, setSearchBar] = useState("");
    useEffect(()=>{
        if(location.state != null){
            setInCart(location.state.cartItems)
        }
    },[location])

    function handleInCart(item){

        function addToCart(){
        if( inCart.length > 0) return setInCart([...inCart, item])
            else{return setInCart([item])}
        }   

        function updateQuantity(){
            setInCart(
                inCart.map(e => {
                    if(e.id === item.id)return { ...e, quantity: e.quantity + 1}
                    else{return e}
                })
            ) 
        }
    inCart.find(e => e.id == item.id) == undefined ? addToCart() : updateQuantity();
    }
    return (
        <div data-testid="entered-store" >
            <div className={styles.header}>
            
                <h1>Welcome in!</h1>
                <NavBar />
                <span>
                    <form onSubmit={e => {
                        e.preventDefault();
                        setSearchBar('');
                        }}>
                        <span>Looking for something in particular? </span> 
                        <span>
                            <input type="text"  name="search-bar" id={styles.searchFilter} onChange={e => setSearchBar(e.target.value)} value={searchBar}/>
                            {/* <button id={styles.searchButton}>Go</button> */}
                        </span>
                    </form>
                </span>

            </div>
            <div className={styles.shoppingPageContent}>
                <CartBar cartItems={inCart}/>
                <Inventory updateCartItems={handleInCart} filterValue={searchBar}/>
            </div>
        </div>
    )
}

export default ShoppingPage;