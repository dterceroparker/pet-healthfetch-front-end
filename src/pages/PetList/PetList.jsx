import { useEffect, useState } from 'react'
import PetCard from '../../components/PetCard/PetCard'
import styles from './PetList.module.css'

const PetList = (props) => {
  const [searchQuery, setSearchQuery] = useState('') // State for search query

  useEffect(() => {
    // scrolls the browser window to the top position
    window.scrollTo(0, 0)
  }, [])

  const filteredPets = props.pets.filter((pet) => {
    // Implement search logic here
    const searchTerm = searchQuery.toLowerCase()
    return (
      pet.name.toLowerCase().includes(searchTerm) 
    )
  })

  return (
    <main className={styles.container}>
      <header className={styles.listHeader}>
      <h1>PET MEMBERS</h1>
      <section className={styles.searchInput}>
      <input 
        type="text"
        placeholder="Search pet members..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      /> 
      {!filteredPets.length && <h2>Oops! No pets found!</h2>}
      </section>
      </header>
      <ul className={styles.ulPetlist}>
        {filteredPets.map((pet) => (
          <PetCard key={pet._id} pet={pet} user={props.user} />
        ))}
      </ul>
    </main>
  )
}

export default PetList
