import { useState, useEffect } from 'react'
import './App.css'
import Storefront from './Storefront';
import Inventory from './Inventory';

function App() {
  const [inStore, setInStore] = useState(false);
  const handleInStore = () => inStore ? setInStore(false) : setInStore(true);
  if(inStore){return <Inventory />}
  return (
      <Storefront clickHandler={handleInStore}/>
  )
}

export default App
