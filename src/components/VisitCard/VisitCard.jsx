//npm modules
// import { NavLink } from "react-router-dom"
// import Icon from "../Icon/Icon"

//css
import styles from './VisitCard.module.css'

const VisitCard = ({ visit }) => {
  console.log('visit.visitDate:', visit.visitDate)
  console.log('visit.visitReason:', visit.visitReason)
  console.log('visit.urgent:', visit.urgent)
  console.log('visit._id:', visit._id)
  console.log('visit.owner:', visit.owner)

  return (
    <article className={styles.container}>
      <h1>Visit Details</h1>
      <header>
        <p>Visit Reason: {visit.visitReason}</p>
        <p>Visit Date: {new Date(visit.visitDate).toLocaleDateString()}</p>
        {/* <p>Visit Time: {new Date(visit.visitDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p> */}
        <p>Is Visit Urgent?: {visit.urgent ? 'Yes' : 'No'}</p>
      </header>
      <section>

      </section>
    </article>
  )
}

export default VisitCard