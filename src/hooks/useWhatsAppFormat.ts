import { useMemo } from 'react'

export function useWhatsAppFormat(value: string | undefined) {
  const formatted = useMemo(() => {
    if (!value) return ''

    const digits = value.replace(/\D/g, '').slice(0, 11) // garante até 11 dígitos
    const match = digits.match(/^(\d{2})(\d{5})(\d{4})$/)

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }

    return value
  }, [value])

  return formatted
}
