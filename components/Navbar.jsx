import styles from "../styles/Navbar.module.css"
import Image from 'next/image'
import {useSelector} from "react-redux"
import Link from 'next/link'
import React, { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdOutlineRestaurantMenu } from 'react-icons/md'


const Navbar = () => {
   const [toggleMenu, setToggleMenu] = useState(false)
  const quantity = useSelector(state => state.cart.quantity);
 

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href='https://wa.me/60122916169' passHref>
          <div className={styles.callButton}>
            <Image
              className={styles.phone}
              src='/img/telephone.png'
              alt=''
              width='32'
              height='32'
            />
          </div>
        </Link>

        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='http://localhost:3000/' passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>

          {/*<li className={styles.listItem}>Products</li>*/}
          <li className={styles.listItem}>Menu</li>
          <Image
            className={styles.logo}
            src='/img/logo2.png'
            alt=''
            width='350px'
            height='120px'
          />
          <li className={styles.listItem}>Reviews</li>
          {/*<li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>*/}
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href='/cart' passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image
              className={styles.image}
              src='/img/cart.png'
              alt=''
              width='50px'
              height='40px'
            />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>

      <div className={styles.smallscreen}>
        <GiHamburgerMenu
          color='#fff'
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />

        {toggleMenu && (
          <div className={styles.smallscreen_overlay}>
            <MdOutlineRestaurantMenu
              fontSize={27}
              className={styles.overlay__close}
              onClick={() => setToggleMenu(false)}
            />
            <ul className={styles.smallscreen_links}>
              <li>
                <Link href='http://localhost:3000/' passHref>
                  <li onClick={() => setToggleMenu(false)}>Homepage</li>
                </Link>
              </li>
              <li>
                <a href='#menu' onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href='#Reviews' onClick={() => setToggleMenu(false)}>
                  Reviews
                </a>
              </li>
              <li>
                <a href='#contact' onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
