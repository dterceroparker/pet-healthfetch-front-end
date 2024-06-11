import VisitCard from '../VisitCard/VisitCard'

const Visits = (props) => {
  if (!props.visits) return <h4>No Visits Yet</h4>

  console.log('VISIT PROPS', {props}); // Log the entire visits array

  return (
    <>
      {props.visits.map((visit) => (
              <VisitCard
                key={visit._id}
                visit={visit}
                user={props.user}
                petId={props.petId}
                handleDeleteVisit={props.handleDeleteVisit}
              />
      ))}
    </>
  )
}

export default Visits