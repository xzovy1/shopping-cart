import ItemCard from "./ItemCard";
import styles from "./modules/Inventory.module.css"
import { useEffect, useState } from "react";


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
                items.forEach(item => {item.quantity = 1; item.price = item.price.toFixed(2)});
                return setItems(items)
            })
            .catch((error) => setError(error))
            .finally(()=>setLoading(false));
    },[]);
    return {items, error, loading}
}

const Inventory = ({updateCartItems, filterValue}) => {
    const {items, error, loading} = useItems();
    
    if(loading)return <p id="server-loading">Loading...</p>
    if(error)return <p id="server-error">A Server error has occurred</p>
    
    return (
        <>
            <div data-testid="inventory" className={styles.items}>
                {items.filter(item => {
                    if(filterValue == ''){return item}
                    return item.category.includes(filterValue) || item.title.includes(filterValue)}
                ).map((item) => 
                    <ItemCard key={item.id} item={item} itemClickHandler={updateCartItems} />
                )}
                <p data-testid={'quantity'}>{!items.length ? '' : items.length + " items loaded"}</p>
            </div>
        </>
    )
}

export default Inventory;