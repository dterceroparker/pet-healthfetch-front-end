//npm modules\
import { useState, useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom"
//services
import * as petService from '../../services/petService'
//components
import Loading from '../Loading/Loading'
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo'

// css
import styles from './PetDetails.module.css'


const PetDetails = (props) => {
  const { petId } = useParams()
  const [pet, setPet] = useState(null)

  useEffect(() => {
    const fetchPet = async () => {
      const petData = await petService.show(petId)
      setPet(petData)
    }
    fetchPet()
  }, [petId])

  if (!pet) return <Loading />

  return (  
    <main className={styles.container}>
      <div key={pet.photo} >
        <img  src={pet.photo} alt="A photo of this puppy" />
      </div>
      <article>
        <header>
          <OwnerInfo content={pet} />
          <h1>Pet Information:</h1>
        </header>
        <h5>Name: {pet.name.toUpperCase()}</h5>
        <h5>Phone Number: {pet.phone}</h5>
        <h5>Address: {pet.address}</h5>
        <h5>DOB: {new Date(pet.birthDate).toLocaleDateString()}</h5>
        <h5>Breed: {pet.breed}</h5>
        <h5>Color: {pet.color}</h5>
        <h5>Sex: {pet.sex}</h5>
        <h5>Elixir: {pet.elixir}</h5>
        <h5>Medical History: {pet.medicalHistory}</h5>
        <h5>Medications: {pet.medications}</h5>
        <h5>Allergies: {pet.allergies}</h5>
        <h5>Vet Name: {pet.vetName}</h5>
        <span>
          {pet.owner._id === props.user.profile &&
            <>
              <NavLink to='/pets' state={pet}>
              </NavLink> 
            </>
            }
        </span>
      </article>
      <section className={styles.visit}>
        <h1>Visits</h1>
      </section>
    </main>
  )
}

export default PetDetails