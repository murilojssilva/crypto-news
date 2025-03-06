import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string
  errorsField: string
}

export default function Textarea({
  errorMessage,
  errorsField,
  disabled,
  ...props
}: TextareaProps) {
  const applyFormat = (format: string) => {
    const textarea = document.getElementById(
      'custom-textarea'
    ) as HTMLTextAreaElement

    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)

    if (!selectedText) return

    let formattedText = selectedText

    if (format === 'bold') {
      formattedText = `**${selectedText}**`
    } else if (format === 'italic') {
      formattedText = `*${selectedText}*`
    } else if (format === 'underline') {
      formattedText = `__${selectedText}__`
    }

    textarea.value =
      textarea.value.substring(0, start) +
      formattedText +
      textarea.value.substring(end)

    setTimeout(() => {
      textarea.selectionStart = start
      textarea.selectionEnd = start + formattedText.length
      textarea.focus()
    }, 0)

    // Disparar o evento de mudança para atualizar o react-hook-form
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
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
          onClick={() => {
            const textarea = document.getElementById(
              'custom-textarea'
            ) as HTMLTextAreaElement
            if (textarea) {
              textarea.value = ''
              textarea.dispatchEvent(new Event('input', { bubbles: true }))
            }
          }}
          className='px-3 py-1 text-white bg-red-600 rounded text-sm'
        >
          Limpar
        </button>
      </div>

      <textarea
        id='custom-textarea'
        {...props}
        className={clsx(
          'border border-gray-400 p-2 rounded w-full text-gray-800 placeholder:text-gray-400 outline-none focus:border-blue-800 resize-none',
          {
            'border-red-500 focus:border-red-500': !!errorMessage,
            'bg-gray-300 cursor-not-allowed ': !!disabled,
          }
        )}
        rows={5}
      />

      {errorMessage && (
        <p
          className={clsx('text-red-500 text-sm mt-1', {
            'border-red-500 focus:border-red-500': !!errorsField,
          })}
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}
