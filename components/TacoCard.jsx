import Image from "next/image";
import styles from '../styles/FoodCard.module.css'
import Link from 'next/link'

const TacoCard = ({ taco }) => {
  return (
    <div className={styles.container}>
      <Link href={`/taco/${taco._id}`} passHref>
        <div className={styles.card}>
          <div className={styles.image}>
            <Image src={taco.img} alt='' width='500' height='500' />
          </div>

          <h1 className={styles.title}>{taco.title}</h1>
          <span className={styles.price}>RM{taco.prices[0]}</span>
          <p className={styles.desc}>{taco.desc}</p>
        </div>
      </Link>
    </div>
  )
}

export default TacoCard