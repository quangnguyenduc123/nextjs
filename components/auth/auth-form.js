import { useRef, useState } from 'react';
import { signIn } from 'next-auth/client'
import { useRoter, useRouter } from 'next/router'
import classes from './auth-form.module.css';

async function createUser(email, password) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await res.json()

  if (!res.ok) {

  }
  else {
    return data
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter()

  const email = useRef()
  const password = useRef()

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault()
    if (isLogin) {
      const result = await signIn('credentials',
        {
          redirect: false,
          email: email.current.value,
          password: password.current.value
        })
      if (!result.error) {
        router.push('/profile')
      }
    }
    else {
      try {
        await createUser(email.current.value, password.current.value)
        console.log('success')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={email} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={password} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
