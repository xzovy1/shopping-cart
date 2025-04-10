import './App.css'
import { Link } from "react-router-dom";

function App() {
  return(
    <>
        <h1>Welcome to The Mart Cart!</h1>
        <Link to="shopping-page"><button>Enter</button></Link>
    </>
  )
}

export default App