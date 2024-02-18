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
  console.log(connected)

  const [newTweetText, setNewTweetText] = useState("")

  const [tweetsDatas, setTweetsDatas] = useState([])

  // console.log(connected)
  useEffect(() => {
    if (!connected.token) {
      router.push('/login');
    }
  }, [connected.token, router]);


  const getTweets = () =>{
    fetch("http://localhost:3000/tweets")
    .then(response=>response.json())
    .then(data =>{
      console.log("je prends un nouveau tweet")
      console.log(data.tweets)
      setTweetsDatas(data.tweets)
    })
  }
  const addNewTweet = () =>{
    fetch('http://localhost:3000/tweets/create', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({content:newTweetText, token:connected.token})
    }).then(response => response.json())
    .then(()=>{
      getTweets()
      setNewTweetText("")
    })
  }


  useEffect(()=>{
   
      getTweets()

  },[])



  const tweets = tweetsDatas.sort((a,b)=>new Date(b.createdDate) - new Date(a.createdDate)).map((data, i)=>{
    const userHasLikedTweet = data.isLiked.some(likers => likers.token === connected.token)

    const userIsAuthor = data.author.token === connected.token

    return <Tweet key={i} firstname={data.author.firstname} content={data.content} username={data.author.username} time={data.createdDate} isLiked={data.isLiked.length} id={data._id} userHasLikedTweet={userHasLikedTweet} userIsAuthor={userIsAuthor} getTweets={getTweets} hashtags={data.hashtag}/>
  })
  return (
    <div className={styles.all}>
      <div className={styles.leftpart}>
        <Image src={logo.src} alt="logo" height={30} width={35} />
        <div id={styles.user}>
          <div id={styles.userinfos}>

            <Image src={logo.src} alt="logo" height={30} width={35}/>
            <div id={styles.userinfostext}>
              <h4 id={styles.firstname}>{connected.firstname}</h4>
              <p id={styles.username}>@{connected.username}</p>
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

          {tweets}
        </div>

      </main>
    </div>
  );
}

export default Home;
