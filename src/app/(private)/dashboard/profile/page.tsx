'use client'

import { User } from 'lucide-react'
import RootLayout from '../layout'

export default function Profile() {
  return (
    <RootLayout title='Perfil' IconComponent={User}>
      <div>
        <h1>Perfil</h1>
      </div>
    </RootLayout>
  )
}
