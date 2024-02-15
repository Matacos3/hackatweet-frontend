import styles from "../styles/SignupSignin.module.css"
import logo from "../images/seuleimg.png"
import { useState } from "react";

function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return (
    <div className={styles.signupwindow}>
      <img id={styles.logo} src={logo.src} alt="logo" />
      <h2 id={styles.title}>Connect to Hackatweet</h2>
      <input className={styles.textinput}type="text" placeholder="Username"onChange={e=>setUsername(e.target.value)} value={username}/>
      <input className={styles.textinput}type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className={styles.button}>Sign up</button>
    </div>
  )
}

export default Signin;