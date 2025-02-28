'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Verify() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Carregando...</div>
  }

  if (status === 'authenticated') {
    return (
      <div>
        <p>{session.user?.name}</p>
        <p>{session.user?.id}</p>
        <p>{session.user?.email}</p>
        <p>{session.user?.image}</p>
        <p>Bem-vindo, {session.user?.name}!</p>
        <button onClick={() => signOut()}>Sair</button>
      </div>
    )
  }

  return (
    <div>
      <p>Você não está autenticado.</p>
      <button onClick={() => signIn()}>Entrar</button>
    </div>
  )
}
