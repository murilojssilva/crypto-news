import Footer from '../components/Footer'
import { Header } from '../components/Header'

export default function Privacy() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-200'>
      <Header />
      <article className='bg-gray-100 p-8 flex-1'>
        <h1 className='font-bold text-blue-800 text-2xl'>Privacidade</h1>
        <p className='text-gray-800'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          laudantium alias sunt commodi enim aut praesentium facilis dignissimos
          optio, provident neque harum, assumenda voluptatem nihil repellat
          magnam expedita cum deserunt.
        </p>
        <p className='text-gray-800'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad iure
          nostrum magnam nisi corporis, distinctio laboriosam laborum voluptatem
          quaerat doloremque voluptate suscipit ipsum repudiandae fugit
          quibusdam. Voluptates, qui in?
        </p>
        <p className='text-gray-800'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque,
          explicabo. Iste vel eligendi earum, ex repellendus laboriosam quos
          officia, nemo animi voluptate excepturi. Commodi, ratione. Et iste
          facilis suscipit nobis?
        </p>
        <p className='text-gray-800'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          itaque maiores laboriosam delectus sit iste magnam doloribus a dolorem
          sunt non veniam, voluptatum ipsa deserunt omnis quibusdam maxime quo
          temporibus!
        </p>
        <p className='text-gray-800'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui omnis
          natus officia possimus modi suscipit iure dolorem mollitia, sequi aut
          sapiente dicta quo tempore inventore sint distinctio molestias
          obcaecati architecto.
        </p>
        <p className='text-gray-800'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          ducimus culpa. Labore explicabo debitis consequatur nam ipsam itaque,
          quod odio suscipit dignissimos sint inventore quae illum facilis
          voluptas corporis? Maiores.
        </p>
      </article>
      <Footer />
    </div>
  )
}
