import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/Admin.module.css'

const Index = ({ orders, products, tacos }) => {
const[pizzaList, setPizzaList] = useState(products)
const [tacoList, setTacoList] = useState(tacos)
const [orderList, setOrderList]  = useState(orders)
const status = ["preparing", "on the way", "delivered"]


const handleDelete = async (id) => {
  console.log(id)

  try {
    const res = await axios.delete('http://localhost:3000/api/products/' + id)
   
    setPizzaList(pizzaList.filter((pizza) => pizza._id !== id))
    
  } catch (err) {
    console.log(err)
  }
}

const handleDeleteTaco = async (id) => {
  console.log(id)

  try {
    const res = await axios.delete('http://localhost:3000/api/tacos/' + id)

    setTacoList(tacoList.filter((taco) => taco._id !== id))
  } catch (err) {
    console.log(err)
  }
}

 const handleStatus = async (id) => {
   const item = orderList.filter((order) => order._id === id)[0]
   const currentStatus = item.status

   try {
     const res = await axios.put('http://localhost:3000/api/orders/' + id, {
       status: currentStatus + 1,
     })
     setOrderList([res.data, ...orderList.filter((order) => order._id !== id)])
   } catch (err) {
     console.log(err)
   }
 }

 const handleDelete2 = async (id) => {
   
   try {
     const res = await axios.delete('http://localhost:3000/api/orders/' + id)
    
     setOrderList(orderList.filter((order2) => order2._id !== id))
   } catch (err) {
     console.log(err)
   }
 }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.th}>Image</th>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Title</th>
              <th className={styles.th}>Price</th>
              <th className={styles.th}>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td className={styles.td}>
                  <Image
                    src={product.img}
                    width={35}
                    height={35}
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td className={styles.td}>{product._id.slice(0, 6)}...</td>
                <td className={styles.td}>{product.title}</td>
                <td className={styles.td}>RM{product.prices[0]}</td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}

          {tacoList.map((taco) => (
            <tbody key={taco._id}>
              <tr className={styles.trTitle}>
                <td className={styles.td}>
                  <Image
                    src={taco.img}
                    width={50}
                    height={50}
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td className={styles.td}>{taco._id.slice(0, 6)}...</td>
                <td className={styles.td}>{taco.title}</td>
                <td className={styles.td}>RM{taco.prices[0]}</td>
                <td className={styles.td}>
                  <button
                    className={styles.button}
                    onClick={() => handleDeleteTaco(taco._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>

      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.th}>Id</th>
              <th className={styles.th}>Customer</th>
              <th className={styles.th}>Contact</th>
              <th className={styles.th}>Details</th>
              <th className={styles.th}>Total</th>
              <th className={styles.th}>Payment</th>
              <th className={styles.th}>Status</th>
            </tr>
          </tbody>

          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td className={styles.td}>{order._id.slice(0, 6)}...</td>
                <td className={styles.td}>{order.customer}</td>
                <td className={styles.td}>{order.numbers}</td>
                <td className={styles.td}>{order.details}</td>
                <td className={styles.td}>RM{order.total.toFixed(2)}</td>
                <td className={styles.td}>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td className={styles.td}>{status[order.status]}</td>
                <td className={styles.button2}>
                  <button
                    className={styles.next}
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete2(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {

const myCookie = ctx.req?.cookies || "";

if(myCookie.token !== process.env.TOKEN) {
  return{
    redirect:{
      destination:"/admin/login",
      permanent: false,
    }
  }
}

  const productRes = await axios.get('http://localhost:3000/api/products')
  const TacoRes = await axios.get('http://localhost:3000/api/tacos')
  const orderRes = await axios.get('http://localhost:3000/api/orders')

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
      tacos: TacoRes.data
    },
  }
}

export default Index
