//npm imports
import { useState } from 'react'

// css
import styles from './NewVisit.module.css'

// components
import Icon from "../Icon/Icon"

const NewVisit = (props) => {
  const [formData, setFormData] = useState({
    photo: '',
    visitReason: '',
    visitDate: '',
    urgent: false,
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  
  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddVisit(formData)
    setFormData({
      photo: '',
      visitReason: '',
      visitDate: '',
      urgent: false,
    })
  }

  const handleCheckBox = (evt) => {
    // Access the checkbox's checked state directly
    const isChecked = evt.target.checked;
    // Update formData using spread syntax 
    setFormData({ ...formData, urgent: isChecked });
  }

  return (
    <>
      <h1>New Visit</h1>
    <form autoComplete="off" className={styles.container} onSubmit={handleSubmit}>
      <label htmlFor="visitReason-input">Visit Reason</label>
        <input
          required
          type="text" 
          name="visitReason"
          id="visitReason-input"
          placeholder="Visit Reason"
          value={formData.visitReason}
          onChange={handleChange}
        />
        <label htmlFor="visitDate-input">Visit Date</label>
				<input
          required
          type="datetime-local"
          name="visitDate"
          id="visitDate-input"
          value={formData.visitDate} // Use formData.visitDate for initial value
          onChange={handleChange} // Pass handleChange function as event handler
        />
        <label htmlFor="urgent-input">Is Visit Urgent?</label>
        <input
          type="checkbox"
          name="urgent"
          id="urgent-checkbox"
          checked={formData.urgent}  // Directly use formData.urgent for checked state
          onChange={handleCheckBox}  // Pass handleCheckBox function as the event handler
        />
      <button type="submit"><Icon category="Create" /></button>
    </form>
    </>
  )
}

export default NewVisit
