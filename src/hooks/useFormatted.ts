'use client'

import { useEffect, useState } from 'react'

export function useFormattedDate() {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    const date = new Date()
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }
    let formattedDate = date.toLocaleDateString('pt-BR', options)
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)
    setCurrentDate(formattedDate)
  }, [])

  return currentDate
}
