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
          <span>
            <h1>{pet.name.toUpperCase()}</h1>
          </span>
          <OwnerInfo content={pet} />
        </header>
        <p>Elixir: {pet.elixir}</p>
        <div>
        <img src={pet.photo} alt="pet's photo" />
        </div>
      </article>
    </NavLink>
  )
}

export default PetCard