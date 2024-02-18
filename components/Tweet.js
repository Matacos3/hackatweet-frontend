import styles from "../styles/Tweet.module.css"
import Image from 'next/image';
import source from "../images/user_img.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from 'moment';
import "moment/locale/fr"


function Tweet(props) {

  const connected = useSelector((state) => state.user.value)
 
  
  

  const handleLike = () =>{

    console.log(textContent)
    fetch(`http://localhost:3000/tweets/like/${props.id}`,{
      method : "PUT",
      headers : {"Content-Type" : "application/json"},
      body:JSON.stringify({token : connected.token})

    }

    )
    .then(response=>response.json())
    .then(data=>{
      // setLikeNumbers(data.isLiked.length)
      // setTweetIsLiked(!tweetIsLiked)
      props.getTweets()
    }
      )



  }
  
  const handleDelete = () =>{
    console.log("c’est pour supprimer")
    fetch(`http://localhost:3000/tweets/isActive/${props.id}`,{
      method:"PUT",
      headers:{"Content-Type" : "application/json"}
    })
    .then(response=>response.json())
    .then(data=>{
      props.getTweets()
    })
    
  }

  const textContent = props.content.split(" ").map(word => {
    if(props.hashtags.includes(word.slice(1))){
      return <span className={styles.hashtags}> {word}</span>
    }else{
      return <span> {word}</span>
    }
    
  })

  return (
    <div className={styles.tweets}>
      <div id={styles.header}>
        <div className={styles.imgcontainer}>

          <Image src={source} width={50} height={60} style={{ borderradius: "50%" }} />
        </div>

        <h5 id={styles.firstname}>{props.firstname}</h5>
        <p id={styles.username}>@{props.username}</p>
        <p id={styles.time}>{moment(props.time).fromNow()}</p>
      </div>
      <div id={styles.textcontent}>
        {textContent}
      </div>
      <div id={styles.iconspace}>
      <FontAwesomeIcon onClick={() => handleLike()} icon={faHeart} className={styles.icon} style={{color : props.userHasLikedTweet && "#776959"}} />
      <p style={{color : props.userHasLikedTweet && "#776959"}}>{props.isLiked}</p>
      <FontAwesomeIcon onClick={()=>handleDelete()} icon={faTrashCan} className={styles.icon} style={{display : !props.userIsAuthor && "none"}}/>
      </div>
    </div>
  )
}

export default Tweet;