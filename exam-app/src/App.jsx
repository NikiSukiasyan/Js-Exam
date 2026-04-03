import { useState } from 'react'
import Login from './Login'
import Exam from './Exam'
import Results from './Results'

function getInitialState() {
  const session = localStorage.getItem('examSession')
  if (session) {
    try {
      const data = JSON.parse(session)
      const elapsed = Math.floor((Date.now() - data.startTime) / 1000)
      const TOTAL_TIME = 70 * 60
      if (elapsed < TOTAL_TIME) {
        return {
          page: 'exam',
          scores: data.scores || [0, 0, 0, 0],
          examTasks: data.tasks,
          savedAnswers: data.answers || ['', '', '', ''],
          savedTimeLeft: TOTAL_TIME - elapsed,
        }
      } else {
        localStorage.removeItem('examSession')
      }
    } catch {
      localStorage.removeItem('examSession')
    }
  }
  return { page: 'login', scores: [0, 0, 0, 0], examTasks: null, savedAnswers: null, savedTimeLeft: null }
}

function App() {
  const initial = getInitialState()
  const [page, setPage] = useState(initial.page)
  const [scores, setScores] = useState(initial.scores)
  const [examTasks, setExamTasks] = useState(initial.examTasks)
  const [savedAnswers] = useState(initial.savedAnswers)
  const [savedTimeLeft] = useState(initial.savedTimeLeft)

  const totalScore = scores.reduce((a, b) => a + b, 0)
  const studentName = localStorage.getItem('studentName') || ''

  const handleStart = (tasks) => {
    const session = {
      startTime: Date.now(),
      tasks,
      answers: ['', '', '', ''],
      scores: [0, 0, 0, 0],
    }
    localStorage.setItem('examSession', JSON.stringify(session))
    setExamTasks(tasks)
    setScores([0, 0, 0, 0])
    setPage('exam')
  }

  const handleFinish = () => {
    localStorage.removeItem('examSession')
    setPage('results')
  }

  const handleRestart = () => {
    localStorage.removeItem('examSession')
    setScores([0, 0, 0, 0])
    setPage('login')
  }

  return (
    <div className="app">
      {page === 'login' && (
        <Login onStart={handleStart} />
      )}
      {page === 'exam' && examTasks && (
        <Exam
          tasks={examTasks}
          scores={scores}
          setScores={setScores}
          onFinish={handleFinish}
          initialAnswers={savedAnswers}
          initialTimeLeft={savedTimeLeft}
        />
      )}
      {page === 'results' && (
        <Results
          studentName={studentName}
          scores={scores}
          tasks={examTasks}
          totalScore={totalScore}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
