// npm modules
import { NavLink } from 'react-router-dom'

// components
import OwnerInfo from '../OwnerInfo/OwnerInfo'

// css
import styles from './PetCard.module.css'

const PetCard = ({ pet }) => {
  return (
    <NavLink to={`/pets/${pet._id}`}>
      <article className={styles.container}>
        <header>
          <OwnerInfo content={pet} />
          </header>
        <section className={styles.petDetails}> {/* Added section for pet details */}
          <h2>{pet.name.toUpperCase()}</h2>
          <p>Elixir: {pet.elixir}</p>
          <div>
            <img src={pet.photo} alt="pet's photo" />
          </div>
        </section>
      </article>
    </NavLink>
  )
}

export default PetCard