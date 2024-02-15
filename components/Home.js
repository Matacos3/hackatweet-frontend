import styles from '../styles/Home.module.css';
import { useEffect } from "react";
import logo from "../images/seuleimg.png"


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/user";
import { useRouter } from "next/router";


import Link from 'next/link';

function Home() {
  const dispatch = useDispatch()
  const connected = useSelector((state) => state.user.value)
  const router = useRouter();

  console.log(connected)
  useEffect(() => {
    if (!connected.token) {
      router.push('/login');
    }
  }, [connected.token, router]);

  return (
    <div className={styles.all}>
      <div className={styles.leftpart}>
        <img id={styles.logo} src={logo.src} alt="logo" />
        <div id={styles.user}>
          <div id={styles.userinfos}>

            <img id={styles.logo} src={logo.src} alt="logo" />
            <div id={styles.userinfostext}>
              <h4>John</h4>
              <p>@JohnCena</p>
            </div>
          </div>
          <button id={styles.button }onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </div>
      <main className={styles.main}>
        <h1>Home</h1>
        <Link href="/login">Se connecter</Link>
      </main>
    </div>
  );
}

export default Home;
