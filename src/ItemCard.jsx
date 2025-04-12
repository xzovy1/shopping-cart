import styles from './modules/ItemCard.module.css';

const ItemCard = ({item, itemClickHandler}) => {
    return (
        <div className={styles.itemCard} key={item.id} data-testid={"item"}>
            <div className={styles.imageDiv}>
                <img src={item.image} alt={item.description} />
            </div>
            <div className={styles.infoDiv}>
                <div className={styles.itemTitle}>
                <b>${item.price}</b> {item.title}
                </div>
                <p>{item.description}</p>
                <button onClick={()=>{itemClickHandler(item)}} >Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemCard