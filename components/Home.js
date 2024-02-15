import styles from '../styles/Home.module.css';

import Link from 'next/link';

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1>Test</h1>
        <Link href="/login">Se connecter</Link>
      </main>
    </div>
  );
}

export default Home;
