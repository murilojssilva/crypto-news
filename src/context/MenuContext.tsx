// context/MenuContext.tsx
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type MenuContextType = {
  openMenu: boolean
  setOpenMenu: (open: boolean) => void
}

const MenuContext = createContext<MenuContextType | undefined>(undefined)

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) throw new Error('useMenu must be used within a MenuProvider')
  return context
}
