import { Link } from "react-router-dom"
const OrderComplete = () => {
    return (
        <>
            <h1>Order Placed! Thank you!</h1>
            <Link to="/shopping-page">Shop for more</Link>
        </>
    )
}

export default OrderComplete