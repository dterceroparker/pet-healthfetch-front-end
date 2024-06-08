import { useState } from 'react'
import { useParams } from 'react-router-dom';

// css
import styles from './NewVisit.module.css';

// components
import Icon from '../../components/Icon/Icon';

const NewVisit = ({ handleAddVisit }) => {
  const { petId } = useParams(); // Extract petId from URL
  const [formData, setFormData] = useState({
    photo: '',
    visitReason: '',
    visitDate: '',
    urgent: false,
  })

  const [formErrors, setFormErrors] = useState({}) // State to store validation errors

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
    setFormErrors({ ...formErrors, [evt.target.name]: '' }) // Clear error on change
    console.log("Updated FormData:", formData)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const errors = validateForm() // Call validation function
    setFormErrors(errors) // Update state with any errors

    if (Object.keys(errors).length === 0) { // No errors, submit form
      console.log("Submitted FormData:", formData)
      handleAddVisit(formData, petId )
      setFormData({
        photo: '',
        visitReason: '',
        visitDate: '',
        urgent: false,
      })
    } else {
      console.log("Form submission prevented due to errors:", errors)
    }
  }

  const handleCheckBox = (evt) => {
    // Access the checkbox's checked state directly
    const isChecked = evt.target.checked
    console.log("Checkbox clicked:", isChecked)
    // Update formData using spread syntax 
    setFormData({ ...formData, urgent: isChecked })
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.visitReason) {
      errors.visitReason = 'Visit reason is required'
    }
    if (!formData.visitDate) {
      errors.visitDate = 'Visit date is required'
    }
    return errors
  }

  return (
    <>
      <h1>New Visit</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <label htmlFor="visitReason-input">Visit Reason</label>
        <input
          required
          type="text"
          name="visitReason"
          id="visitReason-input"
          style={{ margin: '10px' }}
          placeholder="Visit Reason"
          value={formData.visitReason}
          onChange={handleChange}
          // Add error class if there's an error for visitReason
          className={formErrors.visitReason ? styles.errorInput : ''}
        />
        {formErrors.visitReason && <p className={styles.errorText}>{formErrors.visitReason}</p>} {/* Display error message */}
        <label htmlFor="visitDate-input">Visit Date</label>
        <input
          required
          // allows users to select both date and time
          type="datetime-local"
          name="visitDate"
          id="visitDate-input"
          style={{ margin: '10px' }}
          value={formData.visitDate}
          onChange={handleChange}
          // Add error class if there's an error for visitDate
          className={formErrors.visitDate ? styles.errorInput : ''}
        />
        {formErrors.visitDate && <p className={styles.errorText}>{formErrors.visitDate}</p>} {/* Display error message */}
        <label htmlFor="urgent-checkbox">Is Visit Urgent?</label>
        <input
          type="checkbox"
          name="urgent"
          id="urgent-checkbox"
          style={{ margin: '10px' }}
          checked={formData.urgent}
          onChange={handleCheckBox}
        />
        <button type="submit" className={styles.submitButton} >
          <Icon category="Create" />
        </button>
      </form>
    </>
  );
};

export default NewVisit;
