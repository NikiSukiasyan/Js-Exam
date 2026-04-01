import { useState } from 'react'
import Login from './Login'
import Exam from './Exam'
import Results from './Results'

function App() {
  const [page, setPage] = useState('login')
  const [scores, setScores] = useState([0, 0, 0, 0])
  const [examTasks, setExamTasks] = useState(null)

  const totalScore = scores.reduce((a, b) => a + b, 0)
  const studentName = localStorage.getItem('studentName') || ''

  return (
    <div className="app">
      {page === 'login' && (
        <Login onStart={(tasks) => { setExamTasks(tasks); setPage('exam') }} />
      )}
      {page === 'exam' && examTasks && (
        <Exam
          tasks={examTasks}
          scores={scores}
          setScores={setScores}
          onFinish={() => setPage('results')}
        />
      )}
      {page === 'results' && (
        <Results
          studentName={studentName}
          scores={scores}
          tasks={examTasks}
          totalScore={totalScore}
          onRestart={() => { setScores([0, 0, 0, 0]); setPage('login') }}
        />
      )}
    </div>
  )
}

export default App
