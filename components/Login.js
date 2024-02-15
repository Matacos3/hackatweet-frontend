import styles from '../styles/Login.module.css';
import logo from "../images/seuleimg.png"
import { Modal ,ConfigProvider, Space } from 'antd';
import { useState } from "react"
import Signup from "../components/Signup"
import Signin from "../components/Signin"

console.log(logo.src)


function Login() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false)
  console.log(isLoginModalVisible)

  const handleLoginModal = () => {
    console.log("login")
    setIsLoginModalVisible(!isLoginModalVisible);

  }

  const handleSignupModal = () =>{

    setIsSignupModalVisible(!isSignupModalVisible)
  }
  return (
    <ConfigProvider
    theme={{
      token: {
        /* here is your global tokens */
        borderRadiusLG : "0"
      },
      components: {
        Modal: {
          /* here is your component tokens */
          contentBg:"#dcc1a7"
        },
      },
    }}
  >
    <div className={styles.maincontainer}>
      <div className={styles.imgContainer}>
        <img id={styles.logo} src={logo.src} alt="logo" />
      </div>
      <div className={styles.separator}>

      </div>
      <div className={styles.rightcontainer}>

        <h1 id={styles.maintitle}>
          See what’s happening
        </h1>
        <h2 id={styles.secondtitle}>Join Hackatweet today</h2>
        <button className={styles.button} onClick={() => handleSignupModal()}>Sign up</button>
        <h3>
          Arleady have an account ?
        </h3>
        <button className={styles.button} id={styles.signin} onClick={()=>handleLoginModal()}>Sign in</button>
        <div id="react-modals" className={styles.modal}>
          <Modal
            getContainer="#react-modals"
            open={isLoginModalVisible}
            closable={true}

            footer={null}
            centered
            mask={false}
            onCancel={handleLoginModal}
          >
            <Signin />
          </Modal>
          <Modal
            getContainer="#react-modals"
            open={isSignupModalVisible}
            closable={true}

            footer={null}
            centered
            mask={false}
            onCancel={handleSignupModal}
          >
            <Signup />
          </Modal>
        </div>
      </div>
    </div>
    </ConfigProvider>
  )
}

export default Login;