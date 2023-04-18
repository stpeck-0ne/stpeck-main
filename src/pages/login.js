import Head from 'next/head'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '@/context/SessionProvider'
import axios from 'axios'
import { api } from '@/services/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home () {
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [cuenta, setCuenta] = useState(null)
  const { session, setSession } = useContext(SessionContext)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session, router])

  useEffect(() => {
    if (!cuenta) return
    const { correo, password } = cuenta
    const data = JSON.stringify({
      correo,
      pw: password
    })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${api.link}/usuario`,
      headers: {
        'Content-Type': 'application/json'
      },
      data
    }

    axios.request(config)
      .then((response) => {
        setSession(response.data.r[0])
      })
      .catch((e) => {
        setError('Claves invalidas')
      })
  }, [cuenta, setSession])

  const handleSubmit = (e) => {
    e.preventDefault()
    setCuenta({ correo, password })
  }

  const handleCorreo = (e) => {
    setCorreo(e.target.value)
    setError('')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setError('')
  }

  if (!session) {
    return (
      <>
        <Head>
          <title>PcComponents - Login</title>
          <meta name='description' content='Generated by create next app' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className='flex flex-col items-center py-11 gap-24'>
          <form
            className='bg-[#AE95B1] text-[#000] px-3 py-5 rounded-lg flex flex-col items-center gap-2'
            onSubmit={handleSubmit}
          >
            <span className='text-2xl font-semibold'>
              Login
            </span>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col'>
                <label className='text-lg'>Correo</label>
                <input
                  type='email' placeholder='correo@gmail.com' className='rounded px-4 py-1'
                  onChange={handleCorreo}
                />
              </div>
              <div className='flex flex-col'>
                <label className='text-lg'>Contraseña</label>
                <input
                  type='password' placeholder='**********' className='rounded px-4 py-1'
                  onChange={handlePassword}
                />
              </div>
              <div className='flex justify-center'>
                <motion.button
                  whileHover={{
                    scale: 1.1
                  }}
                  whileTap={{
                    scale: 0.9
                  }}
                  type='submit' className='bg-[#7D5F81] rounded-lg text-[#fff] py-2 px-2'
                >
                  Iniciar sesion
                </motion.button>
              </div>
            </div>
          </form>
          <Link href='/create-user'>
            <motion.button
              whileHover={{
                scale: 1.1
              }}
              whileTap={{
                scale: 0.9
              }}
              className='bg-[#7D5F81] rounded-lg text-[#fff] py-2 px-2'
            >
              Registrarte
            </motion.button>
          </Link>
          {error}
        </main>
      </>
    )
  }
}
