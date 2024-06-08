//npm modules
// import { NavLink } from "react-router-dom"
// import Icon from "../Icon/Icon"
import { DateTime } from "luxon"


//css
import styles from './VisitCard.module.css'

const VisitCard = ({ visit, dateFormat = 'yyyy-LL-dd HH:mm' }) => {
  // Function to format visitDate using Luxon
  const formatVisitDate = (date) => {
    console.log('IN formatVisitDate', {date, dateFormat})
  if (!date) return ''; // Handle empty visitDate
  const formattedDate = DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED);
  console.log('FORMATTED DATE', {formattedDate});
  return formattedDate; // Use provided format string
  }

  return (
    <article className={styles.container}>
      <h1>Visit Card</h1>
      <section>
        <p>Visit Reason: {visit.visitReason}</p>
        <p>Visit Date & Time: {formatVisitDate(visit.visitDate)}</p>
        <p>Is Visit Urgent?: {visit.urgent ? 'Yes' : 'No'}</p>
      </section>
    </article>
  )
}

export default VisitCard