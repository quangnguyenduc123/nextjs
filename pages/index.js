import Link from 'next/link'
import styles from '../styles/Home.module.css'

function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello Next World!</h1>
      <ul>
        <li>
          <Link href="/portfolio">Portfolio page</Link>
          <Link href="/clients">Client page</Link>
        </li>
      </ul>
    </div>
  )
}

export default Home