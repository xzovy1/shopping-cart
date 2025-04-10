import ItemCard from "./ItemCard";
import styles from "./modules/Inventory.module.css"

const Inventory = ({updateCartItems, fetchHook}) => {
   const {items, error, loading} = fetchHook();

    if(error)return <p id="server-error">A Server error has occurred</p>
    if(loading)return <p id="server-loading">Loading...</p>
    return (
        <div data-testid="inventory" className={styles.items}>
            {items.map((item) => 
                <ItemCard key={item.id}item={item} itemClickHandler={updateCartItems} />
            )}
        </div>
    )
}

export default Inventory;