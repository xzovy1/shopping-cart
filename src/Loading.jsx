import styles from './modules/ItemCard.module.css';
const dummyItem={
    title: 'lorem ipsum',
    category: 'lorem ipsum',
    image: '',
    description: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    rating: 'lorem',
    price: '100'
}

const DummyCard = ({item = dummyItem}) => {
    return (
        <div className={styles.dummyCard} key={item.id} data-testid={"item"}>
        <div className={styles.imageDiv}>
            <img src={''} alt={item.description} className={styles.imgPlaceholder}/>
            
        </div>
        <div className={styles.infoDiv}>
            <div className={styles.itemTitle}>
            <b>{item.price}</b> {item.title}
            </div>
            <p>{item.description}</p>
        </div>
    </div>
    )
}

const Loading = () =>{
    return (
        <>
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
            <DummyCard />
        </>
    )
}

export default Loading