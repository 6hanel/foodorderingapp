import styles from "../styles/Cart.module.css"
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { reset } from './redux/cartSlice'
import OrderDetail from '../components/OrderDetail'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const amount = cart.total
  const currency = 'USD'
  const style = { layout: 'vertical' }
  const dispatch = useDispatch()
  const router = useRouter()

  // const detail = cart.products.map((product) => (
  //   <>{product.details}</>
  // ))


  // const details = detail[0].props.children.toString()

  const details = cart.details.toString().replace(/,/g, ". ")
   
  // const replacerFunc = () => {
  //   const visited = new WeakSet()
  //   return (key, value) => {
  //     if (typeof value === 'object'  && value !== null) {
  //       if (visited.has(value)) {
  //         return
  //       }
  //       visited.add(value)
  //     }
  //     return value
  //   }
  // } 
  // let detail = () => replacerFunc.filter(values => 
  //    values =="title" && "sauce" && "extras").map(
  //     values => <li>{values}</li>
  //    )
  
  // console.log('products', cart.products)
  console.log('details=', details)
  //  console.log('replacers=',JSON.stringify(details, replacerFunc()))
   
     
 
  //  console.log('cart.titles=', cart.products.toString())
  // console.log('products', products)
  // console.log('details=', detail)
  // console.log('details=', detail)

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data)
      if (res.status === 201) {
        dispatch(reset())
        router.push(`/orders/${res.data._id}`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              })
            })
          }}
        />
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table} border={0}>
          <tbody>
            <tr className={styles.trTitle}>
              <th style={{ textAlign: 'center' }}>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td className={styles.imgContainer}>
                  <Image
                    src={product.img}
                    layout='fill'
                    objectFit='cover'
                    alt=''
                  />
                </td>
                <td className={styles.name}>
                  <span>{product.title}</span>
                </td>
                <td className={styles.extras}>
                  {product.extras.map((extra) => (
                    <span key={extra._id}>{extra.text} | </span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>
                    RM{product.price.toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    RM{(product.price * product.quantity).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$
            {cart.total.toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>RM
            {cart.total.toFixed(2)}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                ONLINE BANKING
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'Adb4Me5mT8UynUJaVcGfQWih-TaFhvEYkcSzhbS4GDTKjVV28lU-ca2HjbpjvVcRqg1t4odGWbFBj4Hb',
                  components: 'buttons',
                  currency: 'USD',
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} details={details} createOrder={createOrder} />}
    </div>
  )
}

export default Cart;