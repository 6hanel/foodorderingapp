import styles from "../styles/Foodlist.module.css";
import TacoCard from './TacoCard'


const Tacolist = ({tacoList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tacos</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
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
