import clsx from 'clsx'
import { TextareaHTMLAttributes, useState } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string
}

export default function Textarea({ errorMessage, ...props }: TextareaProps) {
  const [text, setText] = useState('')

  const applyFormat = (format: string) => {
    const textarea = document.getElementById(
      'custom-textarea'
    ) as HTMLTextAreaElement

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = text.substring(start, end)

    if (!selectedText) return

    let formattedText = selectedText

    if (format === 'bold') {
      formattedText = `**${selectedText}**`
    } else if (format === 'italic') {
      formattedText = `*${selectedText}*`
    } else if (format === 'underline') {
      formattedText = `__${selectedText}__`
    }

    const newText =
      text.substring(0, start) + formattedText + text.substring(end)
    setText(newText)

    setTimeout(() => {
      textarea.selectionStart = start
      textarea.selectionEnd = start + formattedText.length
      textarea.focus()
    }, 0)
  }

  return (
    <div>
      <div className='flex gap-2 mb-2'>
        <button
          type='button'
          onClick={() => applyFormat('bold')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <b>B</b>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('italic')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <i>I</i>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('underline')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>U</u>
        </button>
        <button
          type='button'
          onClick={() => setText('')}
          className='px-3 py-1 text-white bg-red-600 rounded text-sm'
        >
          Limpar
        </button>
      </div>

      <textarea
        id='custom-textarea'
        {...props}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={clsx(
          'border border-gray-400 p-2 rounded w-full text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-800 resize-none',
          {
            'border-red-500 focus:border-red-500': !!errorMessage,
          }
        )}
        rows={5}
      />

      {errorMessage && (
        <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
      )}
    </div>
  )
}
