import './App.css'
import { Link } from "react-router-dom";
import NavBar from './NavBar';

function App() {
  return(
    <>  
        <NavBar />
        <h1>Welcome to The Mart Cart!</h1>
        <Link to="shopping-page"><button>Enter</button></Link>
    </>
  )
}

export default App