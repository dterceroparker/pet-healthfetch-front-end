import { useState, useEffect } from 'react'
import * as profileService from '../../services/profileService'
import styles from './Profiles.module.css'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  
  return (
    <main className={styles.container}>
      <header className={styles.profileHeader}>
      <h1>Pet Parents</h1>
      </header>
      {profiles.length ? (
        <section className={styles.profiles}>
          <ul>
          {profiles.map(profile => (
            <article key={profile._id} className={styles.profile}>
              <img src={profile.photo} alt="Profile Picture" />
              <p>{profile.name}</p>
            </article>
          ))}
          </ul>
        </section>
      ) : (
        <p>No profiles found.</p>
      )}
    </main>
  )
}


export default Profiles
