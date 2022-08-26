import Image from 'next/image'
import styles from '../styles/Review.module.css'
import Item from './Item'
import Link from 'next/link'
import React from 'react'
import Carousel from 'react-elastic-carousel';
import { useState } from 'react'

import { Helmet } from 'react-helmet'

export default function Review() {

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 1, itemsToShow: 1 },
  { width: 1, itemsToShow: 1 },
]

  return (
    <div>
      <main className={styles.main}>
        <div className={styles.title}>
          <h2>customer&apos;s reviews</h2>
          <div className={styles.underline}></div>
        </div>
      </main>

      <div className={styles.main}>
        <Carousel breakPoints={breakPoints} className={styles.main}>
          <Item className={styles.review}>
            <div className={styles.imgcontainer}>
              <img
                src='https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883334/person-1_rfzshl.jpg'
                alt=''
                className={styles.personimg}
              />
            </div>
            <h4 className={styles.author}>sara jones</h4>
            <p className={styles.info}>
              This cozy restaurant has left the best impressions! Hospitable
              hosts, delicious dishes, beautiful presentation, wide wine list
              and wonderful dessert. I recommend to everyone! I would like to
              come back here again and again.
            </p>
          </Item>
          <Item className={styles.review}>
            <div className={styles.imgcontainer}>
              <img
                src='https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883409/person-2_np9x5l.jpg'
                alt=''
                className={styles.personimg}
              />
            </div>
            <h4 className={styles.author}>anna johnson</h4>
            <p className={styles.info}>
              It’s a great experience. The ambiance is very welcoming and
              charming. Amazing wines, food and service. Staff are extremely
              knowledgeable and make great recommendations.
            </p>
          </Item>
          <Item className={styles.review}>
            <div className={styles.imgcontainer}>
              <img
                src='https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg'
                className={styles.personimg}
              />
            </div>
            <h4 className={styles.author}>peter jones</h4>
            <p className={styles.info}>
              Excellent food. Menu is extensive and seasonal to a particularly
              high standard. Definitely fine dining. It can be expensive but
              worth it and they do different deals on different nights so it’s
              worth checking them out before you book. Highly recommended.
            </p>
          </Item>
          <Item className={styles.review}>
            <div className={styles.imgcontainer}>
              <img
                src='https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883423/person-4_t9nxjt.jpg'
                className={styles.personimg}
              />
            </div>
            <h4 className={styles.author}>bill anderson</h4>
            <p className={styles.info}>
              We are so fortunate to have this place just a few minutes drive
              away from home. Food is stunning, both the tapas and downstairs
              restaurant. Cocktails wow, wine great and lovely selection of
              beers. Love this place and will continue to visit.
            </p>
          </Item>
        </Carousel>
      </div>
    </div>
  )
}










