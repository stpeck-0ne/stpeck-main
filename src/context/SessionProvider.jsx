import { createContext, useState } from 'react'

export const SessionContext = createContext(null)

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null)

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  )
}
