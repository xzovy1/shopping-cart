import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <>
            <h1>Uh oh!</h1> <h2> Looks like this part of the store is closed to customers! </h2>
            <Link to={"shopping-page"}>Continue shopping instead</Link>
        </>
    )
}

export default ErrorPage;