import Image from "next/image";
import styles from '../styles/FoodCard.module.css'
import Link from 'next/link'

const FoodCard = ({pizza}) => {

  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`} passHref>
        <div className={styles.card}>
          <div className={styles.image}>
            <Image
              className={styles.image}
              src={pizza.img}
              alt=''
              width='500'
              height='500'
            />
          </div>

          <h1 className={styles.title}>{pizza.title}</h1>
          <span className={styles.price}>RM{pizza.prices[0]}</span>
          <p className={styles.desc}>{pizza.desc}</p>
        </div>
      </Link>
    </div>
  )
}

export default FoodCard;