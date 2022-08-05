import styles from '../styles/Add.module.css'

const AddButton2 = ({setClose2, title}) => {
  return (
     <div onClick={() => setClose2(false)} className={styles.mainAddButton}>
       {title}
     </div>
  )
}

export default AddButton2
