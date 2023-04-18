import { NavBar } from '@/components/NavBar/NavBar'
import { SessionProvider } from '@/context/SessionProvider'
import '@/styles/globals.css'

import { Montserrat } from 'next/font/google'
const font = Montserrat({ subsets: ['latin'] })

export default function App ({ Component, pageProps }) {
  return (
    <SessionProvider>
      <div className='flex flex-col bg-nyanza-default text-violet-default overflow-x-hidden min-h-screen' style={font.style}>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  )
}
