module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination:
          'https://crypto-news-server-d982fcfac1fc.herokuapp.com/posts/:path*',
      },
    ]
  },
}
