import styles from "../styles/Foodlist.module.css";
import FoodCard from "./FoodCard";


const Foodlist = ({foodList}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rice Bowls</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
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
