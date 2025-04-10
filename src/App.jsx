import './App.css'
import { Link } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [inCart, setInCart] = useState([]);
  function handleInCart(item){
      setInCart([
          ...inCart,
          {item}
      ])
  }
  return(
    <>
        <h1>Welcome to The Mart Cart!</h1>
        <Link to="shopping-page" cartItems={inCart} updateCartItems={handleInCart}><button>Enter</button></Link>
    </>
  )
}

export default App