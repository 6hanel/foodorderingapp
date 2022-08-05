import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src='/img/bg.png' layout='fill' alt='' />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE SERVE RICE BOWLS, TACOS AND PASTAS, DELICIOUS STUFFS.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>DELIVERY SERVICE</h1>
          <p className={styles.text}>
            Within 5km away from S2 Height : RM4
            <br />
            <br />
            Within 10km away from S2 Height : RM6
          </p>
          <br />
          <h1 className={styles.title}>PICK-UP LOCATION</h1>
          <p className={styles.text}>
            Mydin Mall, Seremban 2,
            <br />
            Negeri Sembilan, 70300
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            Orders can be prepared upon arrangement and scheduling.
            <br />
            <br />
            However, please order/ WhatsApp us at least one day in advance!
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
