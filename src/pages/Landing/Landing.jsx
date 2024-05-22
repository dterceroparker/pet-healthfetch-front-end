//assets
import logo from '../../assets/branding/logo.png'
// css
import styles from './Landing.module.css'

const Landing = ({ user }) => {
  return (
    <>
    <main className={styles.container}>
      <h1>Hello, {user ? user.name : 'friend'}</h1>
      <section className={styles.splash}>
          <img src={logo} alt="A cute pet" />
      </section>
      <section className={styles.about}>
        <article>
          <h2>
          Pet HealthFetch strives to meet all of your pet healthcare needs! No need to text with your vet anymore! With our app, members effortlessly create a profile of their pet along with a snapshot of their medical health record and request visits right from their phone. Our app allows users to keep track of their vet visit history and features a photo upload option in the appointment form!
          Pet HealthFetch is the ultimate companion for pet owners - ensuring that their furry friends receive the best care possible - <br></br> anytime, anywhere!
          </h2>
        </article>
      </section>
    </main>
    <footer className={styles.footer}>
        <p>© 2024 HEALTHFETCH INC. PET RIGHTS RESERVED</p>
      </footer>
    </>
  )
}

export default Landing
