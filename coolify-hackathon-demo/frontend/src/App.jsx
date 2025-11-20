import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('Loading...')
  const [error, setError] = useState(false)

  useEffect(() => {
    // Call backend API
    fetch('/api/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        setMessage(data.message)
        setError(false)
      })
      .catch(err => {
        console.error('Error fetching from backend:', err)
        setMessage('Backend not reachable')
        setError(true)
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Coolify Hackathon Demo</h1>
        <div className={`message-box ${error ? 'error' : 'success'}`}>
          <p>{message}</p>
        </div>
        <p className="info">
          {error ? '❌ Unable to connect to backend' : '✅ Connected to backend'}
        </p>
      </header>
    </div>
  )
}

export default App
