import Footer from './components/Footer'
import { Header } from './components/Header'
import LatestNews from './components/LatestNews'

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Header />
      <LatestNews />
      <Footer />
    </div>
  )
}
