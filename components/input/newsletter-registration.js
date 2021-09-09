import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const email = useRef()
  const [hasError, setHasError] = useState()

  const registrationHandler = async (event) => {
    event.preventDefault();

    try {
      const rawResponse = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.current.value })
      });
    } catch (error) {

    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={email}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
