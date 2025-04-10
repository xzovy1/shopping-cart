import ItemCard from "./ItemCard";
import useItems from "./useItems";

const Inventory = ({itemClickHandler, fetchHook}) => {
   const {items, error, loading} = fetchHook();
    // const {items, error, loading} = useItems();

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