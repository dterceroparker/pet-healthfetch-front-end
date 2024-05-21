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
          <header>
            <h1>ABOUT US</h1>
          </header>
          <article>
            <p>
            Our app, Pet healthFetch, is The Best Choice for Your Pets Health Care Needs! No Need to Text with your Vet Anymore! 
            With our app, you can effortlessly create a profile of your pet, and request a new visit right from the app. 
            Our app allows users to keep track of their vet visit history and features a photo upload option in the appointment form! 
            Pet healthfetch is the ultimate companion for pet owners—ensuring that their furry friends receive the best care possible-anytime, anywhere!
            </p>
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
