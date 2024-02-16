import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import logo from "../images/seuleimg.png"
import Image from 'next/image';


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";

import Tweet from "../components/Tweet"
import Link from 'next/link';

function Home() {
  const dispatch = useDispatch()
  const connected = useSelector((state) => state.user.value)
  const router = useRouter();

  const [newTweetText, setNewTweetText] = useState("")

  console.log(connected)
  useEffect(() => {
    if (!connected.token) {
      router.push('/login');
    }
  }, [connected.token, router]);


  const addNewTweet = () =>{
    console.log(newTweetText)
  }

  return (
    <div className={styles.all}>
      <div className={styles.leftpart}>
        <Image src={logo.src} alt="logo" height={30} width={35} />
        <div id={styles.user}>
          <div id={styles.userinfos}>

            <Image src={logo.src} alt="logo" height={30} width={35}/>
            <div id={styles.userinfostext}>
              <h4 id={styles.firstname}>John</h4>
              <p id={styles.username}>@JohnCena</p>
            </div>
          </div>
          <button className={styles.button} onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </div>

      <main className={styles.main}>

        {/* espace de création des tweets */}
        <div id={styles.newtweet}>
          <div id={styles.titlenewtweet}>

            <h1 id={styles.title}>Home</h1>
          </div>
          <div id={styles.inputcontainer}>
            <textarea id={styles.container} placeholder='What’s new ?' rows="3" onChange={(e)=>setNewTweetText(e.target.value)} value={newTweetText} maxLength="280"/>
          </div>
          <div id={styles.newtweetinfos}>
            <div id={styles.newtweetinfoscontainer}>
              <p>{newTweetText.length}/280</p>
              <button className={styles.button} onClick={()=>addNewTweet()}>Tweet</button>
            </div>
          </div>
        </div>


        {/* espace de d’affichage des tweets */}
        <div className={styles.tweetsSpace}>
          <Tweet firstname="John" username="JohnDoe" time="today" content="Je suis content d’être en vie" likes={8}/>
        </div>

      </main>
    </div>
  );
}

export default Home;
