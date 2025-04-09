const ItemCard = ({item, itemClickHandler}) => {
    return (
        <>
        <div className="item-card">
            <img src={item.image} alt={item.description} />
            <p>{item.title}</p>
            {/* <p>i{item.description}</p> */}
            <button onClick={()=>{itemClickHandler(item)}} >Add to Cart</button>
        </div>
        </>
    )
}

export default ItemCard