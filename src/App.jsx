import './App.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import styles from "./modules/App.module.css";

function App() {
  const [zoomClass, setZoomClass] = useState(null)
  const navigate = useNavigate();

  function delayAndGo(e, path){
    e.preventDefault();
    setZoomClass(styles.zoom)
    setTimeout(()=>navigate(path), 600);
  }
  return(
    <>  
        <div className={styles.body}>
          <h1>Welcome to The Mart Cart!</h1>
          <Link to="shopping-page" onClick={(e) => delayAndGo(e, 'shopping-page')} ><button className={`${zoomClass} ${styles.enterBtn}`} >Enter</button></Link>
        </div>
    </>
  )
}

export default App