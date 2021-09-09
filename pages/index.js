
import { useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState()
  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const fubmitFormHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = { email: enteredEmail, feedback: enteredFeedback }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  const loadFeedbackHandler = () => {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback)
      })
  }

  return (
    <div className={styles.container}>
      <h1>Hello Next World!</h1>
      <form onSubmit={fubmitFormHandler}>
        <div>
          <label htmlFor="email">Your email address</label>
          <input type="email" id="email" ref={emailInputRef}></input>
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows='5' ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>

      <hr></hr>

      <button onClick={loadFeedbackHandler}>Load Feedback</button>

      {feedbackItems && <ul>
        {feedbackItems.map((item) => <li key={item.id}>{item.text}</li>)}
      </ul>}
    </div>
  )
}
