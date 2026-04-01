import { useState } from 'react'
import { getRandomVariants } from './tasks'

function Login({ onStart }) {
  const [name, setName] = useState(localStorage.getItem('studentName') || '')

  const handleStart = () => {
    if (!name.trim()) return
    localStorage.setItem('studentName', name.trim())
    const randomTasks = getRandomVariants()
    onStart(randomTasks)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>JavaScript გამოცდა</h1>
        <p className="subtitle">შეიყვანე სახელი და დაიწყე ტესტი</p>

        <div className="info-box">
          <p>დრო: <strong>1 საათი და 20 წუთი</strong></p>
          <p>თასქების რაოდენობა: <strong>4</strong></p>
          <p>მაქსიმალური ქულა: <strong>100</strong></p>
          <p>90+ ქულა = <strong>+5 ბონუს ქულა</strong></p>
        </div>

        <input
          type="text"
          placeholder="შეიყვანე სახელი და გვარი"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
          className="name-input"
        />

        <button onClick={handleStart} className="btn btn-primary btn-large">
          ტესტის დაწყება
        </button>
      </div>
    </div>
  )
}

export default Login
