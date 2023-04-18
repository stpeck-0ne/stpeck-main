import Link from 'next/link'
import { motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import { SessionContext } from '@/context/SessionProvider'

export const NavBar = () => {
  const { session } = useContext(SessionContext)
  const [nombre, setNombre] = useState('')
  const [admin, setAdmin] = useState(0)

  useEffect(() => {
    if (session) {
      setNombre(session.nombre)
      setAdmin(session.admin)
    }
  }, [session])

  return (
    <nav className='px-7 h-16 flex w-full bg-gray-default portrait:h-auto portrait:px-0 portrait:py-4'>
      <ul className='flex justify-between font-semibold text-xl h-full w-full portrait:flex-col portrait:items-center'>
        <li className='flex h-full portrait:w-full'>
          <div className='flex portrait:flex-col portrait:items-center w-full'>
            <NavButton path='/'>
              PcComponents
            </NavButton>
            <NavButton path='/'>
              PcArmadas (En proceso...)
            </NavButton>
            {admin === 1 && (
              <>
                <NavButton path='/crea'>
                  Crear producto
                </NavButton>
                <NavButton path='/consulta'>
                  Consultar ventas
                </NavButton>
              </>
            )}
          </div>
        </li>
        <li className='flex h-full portrait:w-full'>
          <NavButton path='/carrito'>
            Carrito
          </NavButton>
          {!nombre
            ? (

              <NavButton path='/login'>
                Login
              </NavButton>
              )
            : (
              <span className='flex h-full items-center px-4 select-none'>
                {nombre}
              </span>
              )}
        </li>
      </ul>
    </nav>
  )
}

const NavButton = ({ children, path }) => {
  return (
    <Link href={path} className='flex h-full portrait:w-full portrait:justify-center portrait:px-2'>
      <motion.div
        whileHover={{
          backgroundColor: '#809D9D'
        }}
        whileTap={{
          backgroundColor: '#809D9D'
        }}
        className='portrait:flex portrait:justify-center portrait:w-full'
      >
        <motion.span
          className='flex h-full items-center px-4'
          whileHover={{
            scale: 1.12
          }}
          whileTap={{
            scale: 0.8
          }}
        >
          {children}
        </motion.span>
      </motion.div>
    </Link>
  )
}
