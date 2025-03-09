interface TitleProps {
  title: string
}

export function Title({ title }: TitleProps) {
  return (
    <h2 className='text-sm sm:text-4xl text-blue-800 font-extrabold '>
      {title}
    </h2>
  )
}
