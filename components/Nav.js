import React from "react";
import styles from './nav.module.css';
import { useRouter } from "next/router";

function Nav() {
  const router= useRouter();
  const handleLogin=()=>{
    router.push('/login')
  }

  return <div className={styles.nav_container}>
      <nav>
        <ul>
          <img src={"itr.jpg"} style={{width:"40px", height:"40px"}} alt='logo' />
        </ul>
        <ul>
          <li>Home</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
        <div onClick={handleLogin}>
          Login
        </div>
      </nav>
    </div>

}

export default Nav;
