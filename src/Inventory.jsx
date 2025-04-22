import ItemCard from "./ItemCard";
import Loading from "./Loading";
import styles from "./modules/Inventory.module.css"
import { useContext } from "react";
import { ShopContext } from "./ShoppingPage";



const Inventory = ({updateCartItems, filterValue}) => {
    const { items, loading, error } = useContext(ShopContext);
    let queryItems;//replace with memoization
    if(loading)return <div id="server-loading" className={styles.items}><Loading /></div>
    if(error)return <p id="server-error">A Server error has occurred</p>

    return (
        <>
            <div data-testid="inventory" className={styles.items}>
                
                {queryItems = items.filter(item => {
                    if(filterValue == '')return item;
                    else if(item.category.toLowerCase().includes(filterValue.toLowerCase()))return item;
                    else if(item.title.toLowerCase().includes(filterValue.toLowerCase()))return item;
                    else if(item.description.toLowerCase().includes(filterValue.toLowerCase()))return item;
                    
                    }
                ).map((item) => 
                    <ItemCard key={item.id} item={item} itemClickHandler={updateCartItems} />
                )}
                <p data-testid={'quantity'}>{!items.length ? '0 items loaded' : queryItems.length + " items loaded"}</p>
            </div>
        </>
    )
}

export default Inventory;