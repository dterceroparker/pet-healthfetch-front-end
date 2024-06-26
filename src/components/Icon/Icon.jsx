import add from '../../assets/icons/add.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trash.svg'
import calendar from '../../assets/icons/calendar.svg'
import create from '../../assets/icons/create.svg'

const Icon = ({ category }) => {
  const icons = {
    Add: add,
    Edit: edit,
    Trash: trash,
    Calendar: calendar,
    Create: create,
  }
  return (
    <img className="icon" src={icons[category]} alt={`A ${category} icon.`} />
  )
}

export default Icon