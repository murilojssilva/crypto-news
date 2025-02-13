import { Header } from './components/Header'

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Header />
      <section className='bg-gray-300 py-72'>
        <h1>Oi</h1>
      </section>
    </div>
  )
}
