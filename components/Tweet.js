import styles from "../styles/Tweet.module.css"
import Image from 'next/image';

function Tweet(props){
  return (
    <div className={styles.tweets}>
      <div id={styles.header}>

      <Image src="/images/user_img.png" width={50} height={50} style={{borderradius:"50%"}}/>
      <h5>{props.firstname}</h5>
      <p>{props.username}</p>
      <p>{props.time}</p>
      </div>
      <div id={styles.textcontent}>
        {props.content}
      </div>
    </div>
  )
}

export default Tweet;