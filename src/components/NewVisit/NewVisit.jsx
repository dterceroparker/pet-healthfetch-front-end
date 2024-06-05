import { useState } from 'react';

// css
import styles from './NewVisit.module.css';

// components
import Icon from '../Icon/Icon';

const NewVisit = (props) => {
  const [formData, setFormData] = useState({
    photo: '',
    visitReason: '',
    visitDate: '',
    urgent: false,
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

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
          style={{ margin: '10px' }}
          placeholder="Visit Reason"
          value={formData.visitReason}
          onChange={handleChange}
        />
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
        />
        <label htmlFor="urgent-input">Is Visit Urgent?</label>
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
