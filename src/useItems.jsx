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
            .then(d => setItems(d))
            .catch((error) => setError(error))
            .finally(()=>setLoading(false));
    },[]);
    return {items, error, loading}
}

export default useItems;