import { Link } from "react-router-dom";
import SpinningBox from "./SpinningBox";
const OrderComplete = () => {
    return (
        <div className='body'>
            <div id='container'>
            <SpinningBox />
            </div>
            <h1>Order Placed. Thank you!</h1>
            <Link to="/shopping-page">Shop for more</Link>
        </div>
    )
}

export default OrderComplete