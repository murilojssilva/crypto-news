import clsx from 'clsx'
import { useTheme } from 'next-themes'
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
  const { resolvedTheme } = useTheme()
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
    } else if (format === 'strikethrough') {
      formattedText = `~~${selectedText}~~`
    } else if (format === 'code') {
      if (selectedText.includes('\n')) {
        formattedText = `\`\`\`javascript\n${selectedText}\n\`\`\``
      } else {
        formattedText = `\`${selectedText}\``
      }
    } else if (format === 'title') {
      formattedText = `<span class="text-xl font-bold">${selectedText}</span>`
    } else if (format === 'subtitle') {
      formattedText = `<span class="text-md font-semibold">${selectedText}</span>`
    } else if (format === 'unordered-list') {
      const listItems = selectedText
        .split('\n')
        .map((line) => `<li>${line.trim()}</li>`)
        .join('\n')

      formattedText = `<ul class="list-disc pl-6">\n${listItems}\n</ul>`
    } else if (format === 'ordered-list') {
      const listItems = selectedText
        .split('\n')
        .map((line) => `<li>${line.trim()}</li>`)
        .join('\n')

      formattedText = `<ol class="list-decimal pl-6">\n${listItems}\n</ol>`
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

    textarea.dispatchEvent(new Event('input', { bubbles: true }))
  }

  return (
    <div>
      <div className='flex gap-1 mb-2'>
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
          onClick={() => applyFormat('strikethrough')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>S</u>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('code')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>C</u>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('title')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>T</u>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('subtitle')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>t</u>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('ordered-list')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>º</u>
        </button>
        <button
          type='button'
          onClick={() => applyFormat('unordered-list')}
          className='px-3 py-1 text-white bg-gray-700 rounded text-sm'
        >
          <u>-</u>
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
          'border border-gray-400 p-2 rounded w-full outline-none focus:border-blue-800 resize-none',
          {
            'border-red-500 focus:border-red-500': !!errorMessage,
            'bg-gray-300 cursor-not-allowed ': !!disabled,
            'text-gray-800 placeholder:text-gray-400 bg-gray-100':
              resolvedTheme === 'light',
            'text-gray-200 placeholder:text-gray-200 bg-gray-800':
              resolvedTheme !== 'light',
          }
        )}
        rows={10}
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
