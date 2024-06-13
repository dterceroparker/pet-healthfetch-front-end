import { useState, useEffect } from 'react'
import { useParams, NavLink } from "react-router-dom"
import * as petService from '../../services/petService'
import Loading from '../Loading/Loading'
import OwnerInfo from '../../components/OwnerInfo/OwnerInfo'
import Icon from '../../components/Icon/Icon'
import Visits from '../../components/Visits/Visits'
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

  const handleDeleteVisit = async (petId, visitId) => {
    // deleteComment service call will go here
    await petService.deleteVisit(petId, visitId)
    setPet({ ...pet, visits: pet.visits.filter((v) => v._id !== visitId) })
  }

  if (!pet) return <Loading />

  return (
    <main className={styles.container}>
      {pet.owner && props.user && pet.owner._id === props.user.profile ? ( 
      <>
      <div className={styles.details} key={pet.photo} >
        <img id={styles.petPhoto} src={pet.photo} alt="A photo of this puppy" />
      <div className={styles.rightPanel}
      >
      <header className={styles.detailsHeader}>
        <OwnerInfo content={pet} />
      <h1>Pet Information</h1>
      </header>
      <article className={styles.articleDetails}>
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
          <NavLink to='/pets/edit' state={pet}>
            <Icon category='Edit' className={styles.editBtn} />
          </NavLink> 
        </span>
      </article >
      </div>
      </div>
      <article className={styles.newVisits}> 
        <h2>Visits</h2>
      <span >
        <NavLink to={`/pets/${petId}/visits/new`}> 
          <Icon category='Create' id={styles.createBtn} />
        </NavLink>
      </span>
      <section className={styles.visits}>
        <Visits
          petId={petId}
          user={props.user}
          visits={pet.visits}
          handleDeleteVisit={handleDeleteVisit}
        />
      </section>
      </article>
        </>
      ) : (
        <div className={styles.accessSection}>
        <p>Unauthorized Access. You are not the owner of this pet.</p>
        <NavLink to='/pets'> 
          <button className={styles.returnBtn}>Return</button> 
        </NavLink>
        </div>
      )}
    </main>
  )
}

export default PetDetails