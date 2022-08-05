import styles from "../../styles/Product.module.css"
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import {useDispatch} from "react-redux"
import {addProduct} from "../redux/cartSlice"

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0])
  const [size, setSize] = useState(0)
  const [sauce, setSauce] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [extras, setExtras] = useState([])
  const dispatch = useDispatch()

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const title = (
    <div>
      {pizza.title} with {sauce}
    </div>
  )

  //this section is to completely convert the order details to string

  const extras2 = extras.map(
    (extra, key = (extra._id += 1)) => extra.text + '|' 
  )

  const detail = (
    <>
      {title.props.children}. Extras: {extras2} 
    </>
  )

  const details = detail.props.children.toString().replace(/,/g, '. ')

  //this section is to completely convert the order details to string

  const handleChange = (e, option) => {
    const checked = e.target.checked

    if (checked) {
      changePrice(option.price)
      setExtras((prev) => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter((extra) => extra._id !== option._id))
    }
  }

  const handleClick = () => {
    console.log('details:', details)
    // console.log("extras2:", extras2)

    dispatch(addProduct({ ...pizza, extras, price, title, quantity, details }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit='contain' layout='fill' alt='' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>
          {title}
          {/* {pizza.title} with {sauce} */}
        </h1>
        <span className={styles.price}>RM{price.toFixed(2)}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        {/* <h3 className={styles.choose}>Choose a sauce</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/img/sesamemiso.png' layout='fill' alt='' />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Large</span>
          </div>
        </div> */}
        <h3 className={styles.choose}>Choose a sauce:</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSauce('sesame miso')}>
            <Image src='/img/sesamemiso.png' layout='fill' alt='' />
            <span className={styles.number}>Sesame Miso</span>
          </div>
          <div
            className={styles.size}
            onClick={() => setSauce('cilantro yogurt')}
          >
            <Image src='/img/cilantrosauce.png' layout='fill' alt='' />
            <span className={styles.number}>Cilantro Yogurt</span>
          </div>
          <div
            className={styles.size}
            onClick={() => setSauce('spicy peanut tahini')}
          >
            <Image src='/img/spicypeanut.png' layout='fill' alt='' />
            <span className={styles.number}>Spicy Peanut Tahini</span>
          </div>
          <div
            className={styles.size}
            onClick={() => setSauce('aloha cocktail')}
          >
            <Image src='/img/alohasauce.png' layout='fill' alt='' />
            <span className={styles.number}>Aloha Cocktail</span>
          </div>
          <div className={styles.size} onClick={() => setSauce('terriyaki')}>
            <Image src='/img/terriyaki.png' layout='fill' alt='' />
            <span className={styles.number}>Terriyaki</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional top-ups</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type='number'
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
  return {
    props: {
      pizza: res.data,
    },
  }
}

export default Product