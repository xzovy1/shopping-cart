import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const useItems = () => {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", {mode: "cors"})
            .then(response=>{
                if(response.status >= 400){throw new Error(response.status)}
            return response.json()})
            .then(d => setItems(d))
            .catch((error) => setError(error))
            .finally(()=>setLoading(false));
    },[]);
    return {items, error, loading}
}

const Inventory = ({itemClickHandler}) => {

    const {items, error, loading} = useItems();

    if(error)return <p id="server-error">A Server error has occurred</p>
    if(loading)return <p id="server-loading">Loading...</p>
    console.log(items)
    return (
        <div data-testid="inventory">
            {items.map((item) => 
                <ItemCard item={item} itemClickHandler={itemClickHandler} />
            )}
        </div>
    )
}

export default Inventory;