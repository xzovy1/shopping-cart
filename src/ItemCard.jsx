import styles from './ItemCard.module.css';

const ItemCard = ({item, itemClickHandler}) => {
    return (
        <>
        <div className={styles.itemCard} key={item.key}>
            <img src={item.image} alt={item.description} className={styles.image}/>
            <div>{item.title}</div>
            {/* <p>i{item.description}</p> */}
            <button onClick={()=>{itemClickHandler(item)}} >Add to Cart</button>
        </div>
        </>
    )
}

export default ItemCard