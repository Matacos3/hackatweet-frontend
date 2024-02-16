import styles from "../styles/Tweet.module.css"
import Image from 'next/image';
import source from "../images/user_img.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import { useDispatch, useSelector } from "react-redux";


function Tweet(props) {

  const connected = useSelector((state) => state.user.value)
  const [tweetInfos, setTweetInfos] = useState(props)

  const handleLike = () =>{

    console.log(props.id)
    fetch(`http://localhost:3000/tweets/like/${props.id}`,{
      method : "PUT",
      headers : {"Content-Type" : "application/json"},
      body:JSON.stringify({token : connected.token})

    }

    )
    .then(response=>response.json())
    .then(data=>console.log(data))



  }
  return (
    <div className={styles.tweets}>
      <div id={styles.header}>
        <div className={styles.imgcontainer}>

          <Image src={source} width={50} height={60} style={{ borderradius: "50%" }} />
        </div>

        <h5 id={styles.firstname}>{props.firstname}</h5>
        <p id={styles.username}>@{props.username}</p>
        <p id={styles.time}>{props.time}</p>
      </div>
      <div id={styles.textcontent}>
        {props.content}
      </div>
      <div id={styles.iconspace}>
      <FontAwesomeIcon onClick={() => handleLike()} icon={faHeart} className={styles.likeIcon} />
      <p>{props.isLiked}</p>
      </div>
    </div>
  )
}

export default Tweet;