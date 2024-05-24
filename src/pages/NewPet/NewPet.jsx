//npm modules
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//services
// import * as petService from './services/petService'

// css
import styles from './NewPet.module.css'

const NewPet = (props) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    photo: '',
    name: '',
    phone: '',
    address: '',
    birthDate: new Date(),
    breed: '',
    color: '',
    sex: 'Female',
    elixir: '',
    medicalHistory: '',
    medications: '',
    allergies: '',
    vetName: '',
  })
  // const [photoData, setPhotoData] = useState({ photo: null })
  // const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleAddPet(formData)
  }

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleNavigateHome = () => {
    navigate('/')
  }

  const isFormInvalid = () => {
    return !(formData.name && formData.phone && formData.address)
  }

  const handleChangePhoto = evt => {
    setPhotoData({ photo: evt.target.files[0] })
  }


  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name-input">Name</label>
        <input
          required
          type="text" 
          name="name"
          id="name-input"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="phone-input">Phone</label>
				<input
          required
          type="text"
          name="phone"
          id="phone-input"
          value={formData.phone}
          placeholder="Phone"
          onChange={handleChange}
        />
        <label htmlFor="address-input">Address</label>
				<input
          required
          type="text"
          name="address"
          id="address-input"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
        />
        <label htmlFor="birthDate-input">Birthdate</label>
				<input
          required
          type="date"
          name="birthDate"
          id="birthDate-input"
          value={formData.birthDate}
          placeholder="Birthdate"
          onChange={handleChange}
        />
        <label htmlFor="breed-input">Breed</label>
				<input
          required
          type="text"
          name="breed"
          id="breed-input"
          value={formData.breed}
          placeholder="Breed"
          onChange={handleChange}
        />
        <label htmlFor="color-input">Color</label>
				<input
          required
          type="text"
          name="color"
          id="color-input"
          value={formData.color}
          placeholder="Color"
          onChange={handleChange}
        />
        <label htmlFor="sex-input">Sex</label>
        <select
          required
          name="sex"
          id="sex-input"
          value={formData.sex}
          onChange={handleChange}
        >
          <option value="Female">Female</option>
          <option value="Spayed">Spayed</option>
          <option value="Male">Male</option>
          <option value="Neutered">Neutered</option>
        </select>
        <label htmlFor="elixir-input">Elixir</label>
				<input
          required
          type="text"
          name="elixir"
          id="elixir-input"
          value={formData.elixir}
          placeholder="Elixir"
          onChange={handleChange}
        />
        <label htmlFor="medicalHistory-input">Medical History</label>
				<input
          required
          type="text"
          name="medicalHistory"
          id="medicalHistory-input"
          value={formData.medicalHistory}
          placeholder="Medical History"
          onChange={handleChange}
        />
        <label htmlFor="medications-input">Medications</label>
				<input
          required
          type="text"
          name="medications"
          id="medications-input"
          value={formData.medications}
          placeholder="Medications"
          onChange={handleChange}
        />
        <label htmlFor="allergies-input">Allergies</label>
				<input
          required
          type="text"
          name="allergies"
          id="allergies-input"
          value={formData.allergies}
          placeholder="Allergies"
          onChange={handleChange}
        />
        <label htmlFor="vetName-input">Vet Name</label>
				<input
          required
          type="text"
          name="vetName"
          id="vetName-input"
          value={formData.vetName}
          placeholder="Vet Name"
          onChange={handleChange}
        />
        <label>
          Upload Photo
          <input 
          type="file" 
          name="photo" 
          onChange={handleChangePhoto} 
          />
        </label>
        <div>
          <button disabled={isFormInvalid()} type="submit">Submit</button>
          <button onClick={handleNavigateHome} className='cancel-btn'>Cancel</button>
        </div>
      </form>
    </main>
  )
}

export default NewPet