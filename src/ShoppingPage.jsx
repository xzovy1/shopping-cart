import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

import styles from "./modules/ShoppingPage.module.css";

import CartBar from "./CartBar";
import Inventory from "./Inventory";
import NavBar from "./NavBar";

const ShopContext = createContext({
    inCart: [],
    items: [],
    searchBar: '',
    addToCart: ()=>{}
});

const useItems = () => {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", {mode: "cors"})
            .then(response=>{
                if(response.status >= 400){throw new Error(response.status)}
            return response.json()})
            .then(items => {
                items.forEach(item => {
                    item.quantity = 1; 
                    item.price = item.price.toFixed(2);
                });
                return setItems(items)
            })
            .catch((error) => setError(error))
            .finally(()=>setLoading(false));
    },[]);
    return {items, loading, error}
}

const  ShoppingPage = () => {
    let location = useLocation();
    const [inCart, setInCart] = useState([]);
    const [searchBar, setSearchBar] = useState("");
    useEffect(()=>{
        if(location.state != null){
            setInCart(location.state.cartItems)
        }
    },[location])

    const addToCart = (item) =>{

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
    const  {items, loading , error } = useItems();
    return (
        <ShopContext.Provider value={{ inCart, addToCart, searchBar, items, loading ,error }}>

        <div data-testid="entered-store" className={`${styles.body} body`}>
            <div className={styles.header}>
                <div className={styles.welcome}>
                <h1>Welcome in!</h1>
                <NavBar cartItems={inCart}/>

                </div>
                <span>
                    <form onSubmit={e => {
                        e.preventDefault();
                        setSearchBar('');
                    }}>
                        <span>Looking for something in particular? </span> 
                        <span>
                            <input type="text"  name="search-bar" onChange={e => setSearchBar(e.target.value)} value={searchBar}/>
                        </span>
                    </form>
                </span>

            </div>
            <div className={styles.shoppingPageContent}>
                <CartBar cartItems={inCart}/>
                <Inventory updateCartItems={addToCart} filterValue={searchBar} />
            </div>
        </div>
        </ShopContext.Provider>
    )
}

export default ShoppingPage;
export {ShopContext};   