import styles from "../styles/OrderDetail.module.css"
import { useState } from 'react'

const OrderDetail = ({ total, details, createOrder }) => {
  const [customer, setCustomer] = useState('')
  const [numbers, setNumbers] = useState('')
  const [address, setAddress] = useState('')

  const handleClick = () => {
    console.log('details', details)
    console.log('numbers', numbers)
    createOrder({ customer, numbers, details, address, total, method: 0 })
    console.log(createOrder)
  }
  return (
    
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          You will pay RM{total.toFixed(2)} upon receiving our bank details. We
          will contact you soon.
        </h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder='John Doe'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type='text'
            placeholder='+1 234 567 89'
            className={styles.input}
            onChange={(e) => setNumbers(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder='Elton St. 505 NY'
            type='text'
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
        {details}
      </div>
    </div>
  )
}

export default OrderDetail