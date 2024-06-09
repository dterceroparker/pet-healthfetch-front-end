// npm modules
import { NavLink } from 'react-router-dom'

// components

// css
import styles from './PetCard.module.css'

const PetCard = ({ pet }) => {
  return (
    <NavLink to={`/pets/${pet._id}`}>
      <article className={styles.container}>
          <h2>{pet.name.toUpperCase()}</h2>
          <p>Elixir: {pet.elixir}</p>
        <section className={styles.petDetails}> 
          <img src={pet.photo} alt="pet's photo" />
        </section>
      </article>
    </NavLink>
  )
}

export default PetCard