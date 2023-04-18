import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { api } from '@/services/api'

export const Section = () => {
  const [data, setData] = useState(false)

  const handleAddToCart = (product) => {
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : []
    cart.push(product)
    Cookies.set('cart', JSON.stringify(cart))
  }

  useEffect(() => {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${api.link}/productos`,
      headers: { }
    }

    axios.request(config)
      .then((response) => {
        setData(response.data.productos)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  if (data[0]) {
    return (
      <section className='flex flex-col w-full px-80 gap-5'>
        <span className='text-xl'>
          Productos:
        </span>
        <div className='flex gap-2 max-w-full flex-wrap justify-center'>
          {data.map((p) => {
            return (
              <article className='bg-[#fff] flex flex-col rounded-lg overflow-hidden' key={p.nombre + p.id_producto}>
                <Image
                  src={p.imagen}
                  alt='pc' width={300} height={300} className='shadow-lg bg-[#fff] flex justify-center items-center h-[300px]'
                />
                <div className='flex flex-col px-3 py-4'>
                  <span className='text-xl'>
                    ${p.precio}
                  </span>
                  <span className='text-lg font-semibold'>
                    Nombre:
                  </span>
                  <span>
                    {p.nombre}
                  </span>
                  <div className='flex w-full justify-between'>
                    <span className='text-[#52b23c]'>
                      Envio gratis
                    </span>
                    <motion.button
                      whileHover={{
                        scale: 1.1
                      }}
                      whileTap={{
                        scale: 0.8
                      }}
                      onClick={() => handleAddToCart(p)}
                      className='bg-[#219fe8] text-[#fff] rounded-lg py-1 px-2'
                    >
                      Añadir al carrito
                    </motion.button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    )
  }
}
