import styles from './modules/ItemCard.module.css';

const ItemCard = ({item, itemClickHandler}) => {
    return (
        <>
        <div className={styles.itemCard} key={item.key}>
            <div className={styles.imageDiv}>
                <img src={item.image} alt={item.description} />
            </div>
            <div>
                <div>{item.title}</div>
                {/* <p>i{item.description}</p> */}
                <button onClick={()=>{itemClickHandler(item)}} >Add to Cart</button>
            </div>
        </div>
        </>
    )
}

export default ItemCard