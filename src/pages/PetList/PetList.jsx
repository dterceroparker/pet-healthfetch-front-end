import { useEffect } from 'react'

// components
import PetCard from '../../components/PetCard/PetCard'

//css
import styles from './PetList.module.css'


const PetList = (props) => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return ( 
    <main className={styles.container}>
      <h1>PET MEMBERS</h1>
      {!props.pets.length && <h2>Oops! No pets here!</h2>}

      <ul>
        {props.pets.map(pet =>
          <PetCard 
            key={pet._id} 
            pet={pet}
            user={props.user}
          />
        )}
      </ul>
    </main>
  )
}

export default PetList