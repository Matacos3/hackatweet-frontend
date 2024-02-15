import styles from "../styles/SignupSignin.module.css"
import logo from "../images/seuleimg.png"
import { useState } from "react";

function Signup() {
  const [firstname, setFirstname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  console.log(firstname, username, password)
  return (
    <div className={styles.signupwindow}>
      <img id={styles.logo} src={logo.src} alt="logo" />
      <h2 id={styles.title}>Create your Hackatweet account</h2>
      <input className={styles.textinput}type="text" placeholder="Firstname" onChange={e=>setFirstname(e.target.value)} value={firstname}/>
      <input className={styles.textinput}type="text" placeholder="Username"onChange={e=>setUsername(e.target.value)} value={username}/>
      <input className={styles.textinput}type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className={styles.button}>Sign up</button>
    </div>
  )
}

export default Signup;