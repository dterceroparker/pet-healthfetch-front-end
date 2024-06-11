//npm modules
import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom"

// css
import styles from './NewPet.module.css'

const NewPet = ({ handleAddPet }) => {
  const navigate = useNavigate()
  const imgInputRef = useRef(null)
  const [message, setMessage] = useState('')
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
  const [photoData, setPhotoData] = useState({ photo: null })
  const [isSubmitted, setIsSubmitted] = useState(false)
  

  const handleSubmit = async evt => {
    console.log({formData})
    evt.preventDefault()
    try {
      setIsSubmitted(true)
      console.log({photoData})
      await handleAddPet(formData, photoData.photo)
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleNavigateHome = () => {
    navigate('/')
  }

  const { name, phone, address, birthDate, breed, color, sex, elixir, medicalHistory, medications, allergies, vetName } = formData

  const isFormInvalid = () => {
    return !(name && phone && address && birthDate && breed && color && sex && elixir && medicalHistory && medications && allergies && vetName)
  }

  const handleChangePhoto = evt => {
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    setMessage(errMsg)
    
    if (isFileInvalid) {
      imgInputRef.current.value = null
      return
    }
    console.log({photo: evt.target.files})
    setPhotoData({ photo: evt.target.files[0] })
  }

  return (
    <main className={styles.container}>
      <p>{message}</p>
      <h1>New Pet Form</h1>
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
          placeholder="Please use XXX-XXX-XXXX format"
          onChange={handleChange}
        />
        <label htmlFor="address-input">Address</label>
				<input
          required
          type="text"
          name="address"
          id="address-input"
          value={formData.address}
          placeholder="Please include street, city, state, and zip code"
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
        <label className={styles.photo} >
          Upload Photo
          <input 
            type="file" 
            name="photo"
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>
        <>
        <button
            disabled={ isFormInvalid() || isSubmitted }
            type='submit'
          >
            {!isSubmitted ? 'Register Pet-ient' : '🚀 Sending...'}
          </button>
          <button onClick={handleNavigateHome} className='cancel-btn'>Cancel</button>
        </>
      </form>
    </main>
  )
}

export default NewPet