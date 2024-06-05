import VisitCard from '../VisitCard/VisitCard';

const Visits = (props) => {
  if (!props.visits) return <h4>No Visits</h4>

  console.log('props.visits:', props.visits); // Log the entire visits array

  return (
    <>
      {props.visits.map((visit) => {
        console.log('visit:', visit); // Log each visit object
      
          <VisitCard
            key={visit._id}
            visit={visit}
            user={props.user}
          />
      
      })}
    </>
  );
};

export default Visits;