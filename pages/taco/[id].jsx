import styles from "../../styles/Product.module.css"
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import {useDispatch} from "react-redux"
import {addProduct} from "../redux/cartSlice"

const Taco = ({ taco }) => {
  const [price, setPrice] = useState(taco.prices[0])
   const [comment, setComment] = useState(null)
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [extras, setExtras] = useState([])
  const dispatch = useDispatch()

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = taco.prices[sizeIndex] - taco.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

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

  const handleComment = (e) => {

    
  }

  //this section is to completely convert the order details to string

  const extras2 = extras.map(
    (extra, key = (extra._id += 1)) => extra.text + '|' 
  )

  const detail = (
    <>
        {taco.title}. Comments: {comment}. Extras: {extras2}. 
    </>
  )

  const details = detail.props.children.toString().replace(/,/g, '')

  //this section is to completely convert the order details to string

  const handleClick = () => {
    console.log("comment:",comment)
    console.log('details:', details)
    dispatch(addProduct({ ...taco, extras, price, quantity, details }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={taco.img} objectFit='contain' layout='fill' alt='' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{taco.title}</h1>
        <span className={styles.price}>RM{price}</span>
        <p className={styles.desc}>{taco.desc}</p>
        {/* <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/img/size.png' layout='fill' alt='' />
            <span className={styles.number}>Large</span>
          </div>
        </div> */}
        <h3 className={styles.choose}>Remarks:</h3>
        <textarea
          placeholder='For Taco Party box = "Proteins (choose 2): Crispy Prawn/ Crispy Chicken/ Smoked ducks/ Vegan chili corn carné.
          Rice: herb butter/cilantro lime rice"'
          rows='5'
          cols='50'
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button className={styles.button} style={{marginLeft:"-1px"}}onClick={handleComment}>
          Enter
        </button>
        <h3 className={styles.choose}>Choose additional top-ups:</h3>
        <div className={styles.ingredients}>
          {taco.extraOptions.map((option) => (
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
  const res = await axios.get(`http://localhost:3000/api/tacos/${params.id}`)
  return {
    props: {
      taco: res.data,
    },
  }
}

export default Taco