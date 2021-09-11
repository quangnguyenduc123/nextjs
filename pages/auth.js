import { useEffect } from 'react';
import { Router, useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  const router = useRouter()
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace('/')
      }
    })
  })
  return <AuthForm />;
}

export default AuthPage;
