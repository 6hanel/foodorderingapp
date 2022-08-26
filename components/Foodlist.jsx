import styles from "../styles/Foodlist.module.css";
import FoodCard from "./FoodCard";


const Foodlist = ({foodList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rice Bowls</h1>
      <p className={styles.desc}>
        perfect for weeknight dinners, make-ahead lunches, or anytime
        you&apos;re craving a healthy, delicious meal!
      </p>
      <div className={styles.wrapper}>
        {foodList.map((pizza) => (
          <FoodCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  )
}

export default Foodlist
