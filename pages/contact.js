import styled from 'styled-components'
import React, { useRef } from 'react'
import styles from '../styles/Contact.module.css'
import emailjs from '@emailjs/browser'
import { useState } from 'react'



const Contact = () => {
 const [firstName, setFirstName] = useState('');
 const [email, setEmail] = useState('')
 const [message, setMessage] = useState('')

 const handleSubmit = (event) => {
   console.log('handleSubmit ran')
   event.preventDefault() // 👈️ prevent page refresh

   // 👇️ clear all input values in the form
   setFirstName('');
   setEmail('');
    setMessage('')
 }
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_pa0cac4',
        'template_ozerxa4',
        form.current,
        'u3bqUw9pVqe5OmStQ'
      )
      .then(
        (result) => {
          console.log(result.text)
          console.log('message sent')
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <div className={styles.c}>
      <StyledContactForm className={styles.container}>
        <h1 className={styles.h3}>Get in touch</h1>
        <p className={styles.text}>We&apos;d like to hear from you!</p>
        <form ref={form} onSubmit={sendEmail} className={styles.form}>
          <label className={styles.text}>Name</label>
          <input
            type='text'
            name='user_name'
            required
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
          <label className={styles.text}>Email</label>
          <input
            type='email'
            name='user_email'
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className={styles.text}>Message</label>
          <textarea
            name='message'
            required
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            className={styles.button}
            type='submit'
            value='send'
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </StyledContactForm>
    </div>
  )
}

export default Contact

// Styles
const StyledContactForm = styled.div`
  width: 65%;
  form {
   
    input {
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    textarea {
      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }
    
    input[type='submit'] {
      margin-top: 2rem;
      cursor: pointer;
      background-color: #dd6b48;
      color: white;
      border: none;
    }
  }
`