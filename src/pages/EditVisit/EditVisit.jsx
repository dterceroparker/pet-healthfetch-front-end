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
  const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

  const handleChange = (evt) => {
    // Validate date input only if it's the visitDate field
    if (evt.target.name === 'visitDate') {
      const enteredDate = evt.target.value;
      if (enteredDate && enteredDate < today) {
        alert("Please enter a date on or after today.");
        return; // Prevent form update for invalid dates
      }
    }
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await petService.updateVisit(petId, formData)
    navigate(`/pets/${petId}`)
  }

  return (
   <>
      <form className={styles.container}
      onSubmit={handleSubmit}>
        <h1>Edit Visit Form</h1>
        <label htmlFor="visitReason-input">Visit Reason</label>
        <input
          type="text" 
          name="visitReason"
          id="visitReason-input"
          placeholder="Reason For Your Visit"
          value={formData.visitReason}
          onChange={handleChange}
        />
        <label htmlFor="visitDate-input">Visit Date</label>
        <input
          type="datetime-local"
          name="visitDate"
          id="visitDate-input"
          value={formData.visitDate}
          placeholder="Visit Request Date"
          min={today} // Set minimum date to today
          onChange={handleChange}
        />
        <label htmlFor="urgent-checkbox">Is Visit Urgent?</label>
        <input
          type="checkbox"
          name="urgent"
          id="urgent-checkbox"
          style={{ margin: '10px' }}
          checked={formData.urgent}
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </>
  )
}

export default EditVisit
