// assets
import add from '../../assets/icons/add.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trash.svg'
import calendar from '../../assets/icons/calendar.svg'

const Icon = ({ category }) => {
  const icons = {
    Add: add,
    Edit: edit,
    Trash: trash,
    Calendar: calendar,
  }

  return (
    <img className="icon" src={icons[category]} alt={`A ${category} icon.`} />
  )
}

export default Icon