import { useTheme } from 'next-themes'

interface TitleProps {
  title: string
}

export function Title({ title }: TitleProps) {
  const { resolvedTheme } = useTheme()
  return (
    <h2
      className={`text-xl sm:text-4xl font-extrabold
      ${resolvedTheme === 'light' ? 'text-blue-800' : 'text-blue-200'}
    `}
    >
      {title}
    </h2>
  )
}
