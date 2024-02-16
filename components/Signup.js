import styles from "../styles/SignupSignin.module.css"
import logo from "../images/seuleimg.png"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from "next/router";
import Image from 'next/image';



function Signup() {
  const [firstname, setFirstname] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const router = useRouter();

  const createUser = () =>{
    const newUser = {
      firstname : firstname,
      username : username,
      password : password
    }
    console.log(newUser)
    fetch('http://localhost:3000/users/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify(newUser)
    }).then(response => response.json())
      .then(data =>{
        if(data.result===true){
          dispatch(login({token : data.user.token, username : username, firstname : firstname}))
          router.push("/")
        }
      })
  }

  console.log(firstname, username, password)
  return (
    <div className={styles.signupwindow}>
      <Image id={styles.logo} src={logo.src} alt="logo" height={30} width={35}/>
      <h2 id={styles.title}>Create your Hackatweet account</h2>
      <input className={styles.textinput}type="text" placeholder="Firstname" onChange={e=>setFirstname(e.target.value)} value={firstname}/>
      <input className={styles.textinput}type="text" placeholder="Username"onChange={e=>setUsername(e.target.value)} value={username}/>
      <input className={styles.textinput}type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button className={styles.button} onClick={()=>createUser()}>Sign up</button>
    </div>
  )
}

export default Signup;