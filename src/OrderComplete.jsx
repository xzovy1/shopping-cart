import { Fragment } from "react"
import { Link } from "react-router-dom"
const OrderComplete = () => {
    return (
        <div className='body'>
            <h1>Order Placed. Thank you!</h1>
            <Link to="/shopping-page">Shop for more</Link>
        </div>
    )
}

export default OrderComplete