import { Link } from "react-router-dom";

export default function Storefront() {
    return(
        <>
            <h1>Welcome to The Mart Cart!</h1>
            <Link to="shopping-page"><button>Enter</button></Link>
        </>
    )
}