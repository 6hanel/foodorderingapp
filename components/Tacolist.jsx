import styles from "../styles/Foodlist.module.css";
import TacoCard from './TacoCard'


const Tacolist = ({tacoList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tacos</h1>
      <p className={styles.desc}>
        consisting of a small hand-sized, tasty corn- or wheat-based tortilla,
        topped with a filling tasty tacos for a Mexican-inspired feast!
      </p>
      <div className={styles.wrapper}>
        {tacoList.map((taco) => (
          <TacoCard key={taco._id} taco={taco} />
        ))}
      </div>
    </div>
  )
}

export default Tacolist
