module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://crypto-news-server-d982fcfac1fc.herokuapp.com/:path*', // Removido "posts/" para permitir chamadas dinâmicas
      },
    ]
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
}
