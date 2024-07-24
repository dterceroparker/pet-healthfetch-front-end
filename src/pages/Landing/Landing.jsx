import logo from '../../assets/branding/logo.png'
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <>
    <main className={styles.container}>
      <section className={styles.splash}>
          <img src={logo} alt="A cute pet" />
      </section>
      <section className={styles.about}>
        <article>
          <h5>Haven't registered your pet yet? Log in and access the "New Pet Form" from the header to get started!
          </h5>
            <p>
              Pet HealthFetch is your one-stop solution for all your pet healthcare needs! Say goodbye to the hassle of texting your vet - our app makes managing your pet's health effortless. With just a few taps on your phone, members can create a profile for their beloved pets, including a snapshot of their medical records, and easily request visits.
              <br />
              Our user-friendly app keeps track of your pet's vet visit history, putting all the important information right at your fingertips. Plus, with the convenient photo upload option in the appointment form, you can share any necessary details with your vet seamlessly.
              <br />
              Pet HealthFetch is the ultimate companion for pet owners, ensuring that your furry friends receive the best care possible, anytime and anywhere. Experience peace of mind knowing that you can manage your pet's health with ease, all from the palm of your hand.
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
