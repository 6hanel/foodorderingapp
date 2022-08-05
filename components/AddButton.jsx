import styles from '../styles/Add.module.css'

const AddButton = ({setClose, title}) => {
  return (
     <div onClick={() => setClose(false)} className={styles.mainAddButton}>
       {title}
     </div>
  )
}

export default AddButton
