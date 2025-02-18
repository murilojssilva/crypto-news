import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'http://crypto-news-server-d982fcfac1fc.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
})
