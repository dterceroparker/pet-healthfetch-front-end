import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

// components
import Icon from '../../components/Icon/Icon'

// css
import styles from './NewVisit.module.css'

const NewVisit = ({ handleAddVisit }) => {
  const { petId } = useParams() // Extract petId from URL
  const imgInputRef = useRef(null)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    photo: '',
    visitReason: '',
    visitDate: '',
    urgent: false,
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const today = new Date().toISOString().slice(0, 10)
  
  const handleChange = (evt) => {
    // Validate date input only if it's the visitDate field
    if (evt.target.name === 'visitDate') {
      const enteredDate = evt.target.value;
      if (enteredDate && enteredDate < today) {
        setMessage("Please enter a date on or after today.")
        return // Prevent form update for invalid dates
      }
    }
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      setIsSubmitted(true)
      await handleAddVisit(formData, petId, photoData.photo )
      setFormData({
        photo: '',
        visitReason: '',
        visitDate: '',
        urgent: false,
      })
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }
  
  const handleCheckBox = (evt) => {
    // Access the checkbox's checked state directly
    const isChecked = evt.target.checked
    console.log("Checkbox clicked:", isChecked)
    // Update formData using spread syntax 
    setFormData({ ...formData, urgent: isChecked })
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
    <>
    <p>{message}</p>
      <form className={styles.container} 
        onSubmit={handleSubmit}>
          <h1>New Visit Form</h1>
        <label htmlFor="visitReason-input">Visit Reason
        </label>
        <input
          required
          type="text"
          name="visitReason"
          id="visitReason-input"
          style={{ margin: '10px' }}
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
          style={{ margin: '10px' }}
          value={formData.visitDate}
          min={today}
          onChange={handleChange}
        />
        <label htmlFor="urgent-checkbox">Is Visit Urgent?</label>
        <input
          type="checkbox"
          name="urgent"
          id="urgent-checkbox"
          style={{ margin: '10px' }}
          checked={formData.urgent}
          onChange={handleCheckBox}
          />
          <label className={styles.photo} >
          Upload Photo</label>
          <input 
            type="file" 
            name="photo"
            style={{ margin: '10px' }}
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
          <button disabled={ isSubmitted }
              type='submit' className={styles.submitButton} >
            <Icon category="Create" />
            {!isSubmitted ? '' : '🚀 Sending...'}
          </button>
      </form>
    </>
  )
}

export default NewVisit
