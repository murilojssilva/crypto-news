import { ElementType } from 'react'

interface InformationCardItemProps {
  icon: ElementType
  title: string
  text: string
}

export default function InformationCardItem({
  text,
  title,
  icon: Icon,
}: InformationCardItemProps) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Icon size={64} color='#1565C0' />
      <h2 className='font-bold text-blue-800'>{title}</h2>
      <p className='text-gray-800 text-justify'>{text}</p>
    </div>
  )
}
