import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      className={`h-10 w-10 border rounded-xl flex items-center justify-center
    ${
      resolvedTheme === 'dark' ? 'dark:border-blue-400' : 'dark:border-blue-800'
    }
    `}
    >
      {resolvedTheme === 'light' ? (
        <Sun
          className='size-6 text-blue-800'
          onClick={() => setTheme('dark')}
        />
      ) : (
        <Moon
          className='size-6 text-blue-400'
          onClick={() => setTheme('light')}
        />
      )}
      <span className='sr-only'>Toggle theme</span>
    </button>
  )
}
