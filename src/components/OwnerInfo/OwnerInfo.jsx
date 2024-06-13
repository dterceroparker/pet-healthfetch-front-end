import DateCard from '../DateCard/DateCard'
import profileIcon from '../../assets/icons/profile.png'
import styles from './OwnerInfo.module.css'

const OwnerInfo = ({ content }) => {
console.log({content})
const photo = content.owner.photo ? content.owner.photo : profileIcon
console.log({photo})
return (
  <div className={styles.container}>
    <img src={photo} alt="The user's avatar" className={styles.ownerImage} />
    <section className={styles.ownerInfoSection}>
      <h4 className={styles.ownerName}>{content.owner.name}</h4>
      <DateCard createdAt={content.createdAt} />
    </section>
  </div>
  )
}

export default OwnerInfo