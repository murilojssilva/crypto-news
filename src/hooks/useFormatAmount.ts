import { useMemo } from 'react'

export function useFormatAmount(value: number | string | undefined) {
  const formatted = useMemo(() => {
    if (value === undefined || value === null || value === '') return ''

    const number =
      typeof value === 'string'
        ? parseFloat(value.replace(/\D/g, '')) / 100
        : value

    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }, [value])

  return formatted
}
