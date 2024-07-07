import VisitCard from '../VisitCard/VisitCard'

const Visits = (props) => {
  // Function to compare visit dates for sorting
  const compareVisitDates = (a, b) => {
    return new Date(b.visitDate) - new Date(a.visitDate); // Sort in descending order
  }

  // Sort visits array by date in descending order
  const sortedVisits = props.visits.sort(compareVisitDates)

  if (!sortedVisits || sortedVisits.length === 0) {
    return <h4>No Visits Yet</h4>
  }

  return (
    <>
      {sortedVisits.map((visit) => (
        <VisitCard
          key={visit._id}
          visit={visit}
          petId={props.petId}
          handleDeleteVisit={props.handleDeleteVisit}
        />
      ))}
    </>
  )
}

export default Visits
