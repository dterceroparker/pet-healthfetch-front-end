import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from './EditPet.module.css'

const EditPet = (props) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState(state)

  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
    props.handleUpdatePet(formData) 
  }

  const isFormInvalid = () => {
    return !(formData.name && formData.phone && formData.address && formData.sex && formData.elixir && formData.medicalHistory && formData.medications && formData.allergies && formData.vetName)
  }

  const handleNavigateHome = () => {
    navigate('/')
  }

return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
      <h1>EDIT PET</h1>
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
        <>
        <button disabled={isFormInvalid()} type="submit">Submit</button>
        <button onClick={handleNavigateHome} className='cancel-btn'>Cancel</button>
        </>
      </form>
    </main>
  )
}

export default EditPet