export default function Guides() {
  const guides = [
    {
      title: 'Como criar uma carteira cripto?',
      description:
        'Aprenda a configurar e utilizar carteiras digitais como MetaMask, Trust Wallet e Ledger para armazenar suas criptomoedas com segurança.',
      link: '/guides/create-wallets',
    },
    {
      title: 'CEX vs DEX: Qual a diferença?',
      description:
        'Entenda as principais diferenças entre exchanges centralizadas (CEX) e descentralizadas (DEX), além das vantagens e riscos de cada uma.',
      link: '/guides/cex-dex',
    },
    {
      title: 'Principais redes blockchain',
      description:
        'Conheça as redes mais populares da Web3, como Bitcoin, Ethereum, Solana, Avalanche e suas respectivas tecnologias.',
      link: '/guides/networks',
    },
    {
      title: 'O que são Memecoins?',
      description:
        'Descubra o que são memecoins, como Dogecoin e Shiba Inu, e por que elas atraem tanto interesse no mercado cripto.',
      link: '/guides/memecoins',
    },
    {
      title: 'Como proteger seus ativos digitais?',
      description:
        'Saiba como manter suas criptomoedas seguras utilizando carteiras frias, autenticação de dois fatores e boas práticas de segurança.',
      link: '/guides/security',
    },
    {
      title: 'Airdrops: Como ganhar tokens grátis?',
      description:
        'Aprenda como funcionam os airdrops, como participar e os cuidados necessários para evitar golpes.',
      link: '/guides/airdrops',
    },
    {
      title: 'Staking e Yield Farming: Como gerar renda passiva?',
      description:
        'Descubra como funciona o staking e o yield farming, formas populares de obter rendimentos passivos no mercado cripto.',
      link: '/guides/staking-yield-farming',
    },
    {
      title: 'NFTs: O que são e como funcionam?',
      description:
        'Entenda o conceito de tokens não fungíveis (NFTs), como eles são utilizados e seu impacto no mercado digital.',
      link: '/guides/nfts',
    },
    {
      title: 'O que são DAOs?',
      description:
        'Aprenda o que são Organizações Autônomas Descentralizadas (DAOs) e como elas estão transformando a governança digital.',
      link: '/guides/daos',
    },
    {
      title: 'Criptomoedas promissoras para ficar de olho',
      description:
        'Confira algumas das criptomoedas emergentes com potencial de valorização no mercado.',
      link: '/guides/promising-coins',
    },
    {
      title: 'Como funciona a tecnologia DeFi?',
      description:
        'Explore o mundo das finanças descentralizadas (DeFi) e saiba como ele pode revolucionar o sistema financeiro tradicional.',
      link: '/guides/defi',
    },
    {
      title:
        'Bridges e Interoperabilidade: Como transferir cripto entre blockchains?',
      description:
        'Entenda o conceito de bridges, como elas permitem a comunicação entre diferentes blockchains e quais são as melhores opções disponíveis.',
      link: '/guides/bridges-interoperability',
    },
  ]

  return (
    <main className='flex flex-col flex-1'>
      <title>Guias | CryptoNews</title>
      <div className='flex flex-col justify-between p-8'>
        <h1 className='text-blue-800 font-bold text-2xl'>Guias</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 py-8 gap-8'>
          {guides.map((guide, index) => (
            <a
              key={index}
              href={guide.link}
              className='flex flex-col p-4 gap-4 justify-between border rounded-lg shadow-md hover:bg-gray-100 transition'
            >
              <h2 className='text-blue-800 text-xl font-semibold'>
                {guide.title}
              </h2>
              <p className='text-gray-600'>{guide.description}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
