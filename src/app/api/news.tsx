import { useEffect, useState } from 'react'

export default function NewsPage() {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch('/news.json')
      .then((response) => response.json())
      .then((data) => setNews(data))
  }, [])

  return (
    <div>
      <h1>Notícias</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
