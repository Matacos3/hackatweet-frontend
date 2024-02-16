import styles from "../styles/SignupSignin.module.css"
import logo from "../images/seuleimg.png"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";
import Image from 'next/image';




function Signin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const router = useRouter();

  console.log(username, password)
  const handleSignin = () =>{
    const userToLogIn = {
      username : username,
      password : password
    }
    fetch('http://localhost:3000/users/signin', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(userToLogIn)
    }).then(response => response.json())
      .then(data =>{
        if(data.result===true){
          dispatch(login({token : data.token, username : username}))
          router.push("/")
        }
      })
  }

  return (
    <div className={styles.signupwindow}>
      <Image id={styles.logo} src={logo.src} alt="logo" height={30} width={35}/>
      <h2 id={styles.title}>Connect to Hackatweet</h2>
      <input className={styles.textinput}type="text" placeholder="Username"onChange={e=>setUsername(e.target.value)} value={username}/>
      <input className={styles.textinput}type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className={styles.button} onClick={()=>handleSignin()}>Sign up</button>
    </div>
  )
}

export default Signin;