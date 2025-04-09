import { useEffect, useState } from "react";

const useItems = () => {
    const [items, setItems] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products", {mode: "cors"})
            .then(response=>{
                if(response.status >= 400){throw new Error(r.status)}
            return response.json()})
            .then(d => setItems(d))
            .catch((error) => setError(error))
            .finally(()=>setLoading(false));
    },[Inventory]);
    return {items, error, loading}
}

const ItemCard = ({item}) => {

    return (
        <>
        <div className="item-card">
            <img src={item.image} alt={item.description} />
            <p>{item.title}</p>
            {/* <p>i{item.description}</p> */}
            <button onClick={()=>{}} >Add to Cart</button>
        </div>
        </>
    )
}

const Inventory = () => {

    const {items, error, loading} = useItems();
    if(error)return <p>A Server error has occurred</p>
    if(loading)return <p>Loading...</p>

    return (
        <div data-testid="inventory">
            <ItemCard item={items[0]}/>
            <ItemCard item={items[1]}/>
        </div>
    )
}

export default Inventory;