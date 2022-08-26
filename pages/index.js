import axios from "axios"
import Head from 'next/head'
import Featured from '../components/Featured'
import Foodlist from '../components/Foodlist'
import styles from '../styles/Home.module.css'
import { useState } from "react"
import Add from '../components/Add'
import Add2 from '../components/Add2'
import AddButton from '../components/AddButton'
import AddButton2 from '../components/AddButton2'
import Tacolist from '../components/Tacolist'
import Link from 'next/link'

export default function Home({ foodList, admin, tacoList }) {
  const [close, setClose] = useState(true)
  const [close2, setClose2] = useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Aloha Poké</title>
        <meta name='description' content='Best Food in town' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Featured />
      {/* {admin && <AddButton setClose={setClose} title='Add Rice Bowls' />}
      <Foodlist foodList={foodList} />
      {!close && <Add setClose={setClose} />}

      {admin && <AddButton2 setClose2={setClose2} title='Add Tacos'/>}
      <Tacolist tacoList={tacoList} />
      {!close2 && <Add2 setClose2={setClose2} />} */}
      <section className={styles.speciality} id='speciality'>
        <h1 className={styles.heading}>
          our <span className={styles.span}>specialty</span>
        </h1>
        <div className={styles.boxcontainer}>
          <div className={styles.box}>
            <Link href='/menu' passHref>
              <button className={styles.button}>Order Now</button>
            </Link>

            <img
              src='/img/ricebowlss.png'
              alt='rice bowls'
              className={styles.image}
            ></img>

            <div className={styles.content}>
              <h3>irresistable rice bowls</h3>
              <p>
                perfect for weeknight dinners, make-ahead lunches, or anytime
                you&apos;re craving a healthy, delicious meal!
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <Link href='/menu' passHref>
              <button className={styles.button}>Order Now</button>
            </Link>
            <img
              src='/img/tacoss.png'
              alt='tacos'
              className={styles.image}
            ></img>

            <div className={styles.content}>
              <h3>finger-licking tacos</h3>
              <p>
                consisting of a small hand-sized, tasty corn- or wheat-based
                tortilla, topped with a filling tasty tacos for a
                Mexican-inspired feast!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
 const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true
  }
  const res = await axios.get('http://localhost:3000/api/products')
  const res2 = await axios.get('http://localhost:3000/api/tacos')
  return {
    props: {
      foodList: res.data,
      tacoList: res2.data,
      admin,
    },
  }
}
