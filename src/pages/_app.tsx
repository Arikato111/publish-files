import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from 'react'
import { User, getAuth, onAuthStateChanged } from 'firebase/auth'
import { getInitialApp } from '@/firebase/firebase'

export const LoginContext = createContext<{ value: User | null, set: Function } | null>(null)

export default function App({ Component, pageProps }: AppProps) {
  const [login, setLogin] = useState<User | null>(null);

  getInitialApp()

  useEffect(() => {
    onAuthStateChanged(getAuth(), (data) => {
      setLogin(data)
    })
  }, [])

  return <LoginContext.Provider value={{ value: login, set: setLogin }}>
    <Navbar />
    <Component {...pageProps} />
  </LoginContext.Provider>
}
