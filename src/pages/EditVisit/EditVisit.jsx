// npm modules
import { useState } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"

// css
import styles from './EditVisit.module.css'

// services
import * as petService from '../../services/petService'

const EditVisit = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const { petId } = useParams()
  const [formData, setFormData] = useState(state)

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await petService.updateVisit(petId, formData)
    navigate(`/pets/${petId}`)
  }

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Edit Visit Form</h1>
        <label htmlFor="visitReason-input">Visit Reason</label>
        <input
          required
          type="text" 
          name="visitReason"
          id="visitReason-input"
          placeholder="Reason For Your Visit"
          value={formData.visitReason}
          onChange={handleChange}
        />
        <label htmlFor="visitDate-input">Visit Date</label>
				<input
          required
          type="datetime-local"
          name="visitDate"
          id="visitDate-input"
          value={formData.visitDate}
          placeholder="Visit Request Date"
          onChange={handleChange}
        />
        <label htmlFor="urgent-checkbox">Is Visit Urgent?</label>
				<input
          required
          type="checkbox"
          name="urgent"
          id="urgent checkbox"
          value={formData.urgent}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default EditVisit