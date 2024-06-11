// assets
import toodles from '../../assets/branding/toodles.svg'

// css
import styles from './Logout.module.css'

const Logout = () => {
  return (
    <main className={styles.container}>
      <img src={toodles} alt="A cute owl, saying farewell" />
    </main>
  )
}

export default Logout