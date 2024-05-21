// assets
import logo from '../../assets/branding/logo.png'

// css
import styles from './Loading.module.css'

const Loading = () => {
  return (
    <main className={styles.container}>
      <img src={logo} alt="A cute pet" />
    </main>
  )
}

export default Loading