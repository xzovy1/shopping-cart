import './App.css'
import { Link } from "react-router-dom";
import NavBar from './NavBar';

function App() {
  return(
    <>  
        <NavBar />
        <div className='main'>
          <h1>Welcome to The Mart Cart!</h1>
          <Link to="shopping-page"><button>Enter</button></Link>
        </div>
    </>
  )
}

export default App