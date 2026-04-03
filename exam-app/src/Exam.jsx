import { useState, useEffect, useRef } from 'react'
import { checkAnswer, runCode } from './tasks'

const TOTAL_TIME = 70 * 60

function Exam({ tasks, scores, setScores, onFinish }) {
  const [currentTask, setCurrentTask] = useState(0)
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [checked, setChecked] = useState([false, false, false, false])
  const [consoleLogs, setConsoleLogs] = useState([])
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          onFinish()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  useEffect(() => {
    const handlePaste = (e) => {
      e.preventDefault()
    }
    const handleCopy = (e) => {
      if (!e.target.closest('.data-panel')) {
        e.preventDefault()
      }
    }
    const handleContext = (e) => {
      if (!e.target.classList.contains('code-editor') && !e.target.closest('.data-panel')) {
        e.preventDefault()
      }
    }
    document.addEventListener('paste', handlePaste, true)
    document.addEventListener('copy', handleCopy, true)
    document.addEventListener('contextmenu', handleContext, true)
    return () => {
      document.removeEventListener('paste', handlePaste, true)
      document.removeEventListener('copy', handleCopy, true)
      document.removeEventListener('contextmenu', handleContext, true)
    }
  }, [])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleRun = () => {
    const task = tasks[currentTask]
    const result = runCode(task.selectedVariant.dataCode, answers[currentTask])
    setConsoleLogs(result.logs)
  }

  const handleCheck = () => {
    handleRun()

    const task = tasks[currentTask]
    const score = checkAnswer(task.selectedVariant, answers[currentTask])
    const newScores = [...scores]
    newScores[currentTask] = score
    setScores(newScores)

    const newChecked = [...checked]
    newChecked[currentTask] = true
    setChecked(newChecked)
  }

  const handleFinish = () => {
    const newScores = [...scores]
    const newChecked = [...checked]
    tasks.forEach((task, i) => {
      if (!checked[i] && answers[i].trim()) {
        newScores[i] = checkAnswer(task.selectedVariant, answers[i])
        newChecked[i] = true
      }
    })
    setScores(newScores)
    setChecked(newChecked)
    clearInterval(timerRef.current)
    onFinish()
  }

  const handleCopyData = async () => {
    const task = tasks[currentTask]
    try {
      await navigator.clipboard.writeText(task.selectedVariant.dataCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = task.selectedVariant.dataCode
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleTaskChange = (index) => {
    setCurrentTask(index)
    setConsoleLogs([])
  }

  const task = tasks[currentTask]
  const totalScore = scores.reduce((a, b) => a + b, 0)
  const timeWarning = timeLeft < 300

  return (
    <div className="exam-container">
      <div className="exam-header">
        <div className="student-info">
          {localStorage.getItem('studentName')}
        </div>
        <div className={`timer ${timeWarning ? 'timer-warning' : ''}`}>
          {formatTime(timeLeft)}
        </div>
        <div className="score-display">
          ქულა: {totalScore}/100
        </div>
      </div>

      <div className="task-nav">
        {tasks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => handleTaskChange(i)}
            className={`nav-btn ${i === currentTask ? 'active' : ''} ${checked[i] ? 'checked' : ''}`}
          >
            თასქი {i + 1}
            {checked[i] && <span className="check-score"> ({scores[i]})</span>}
          </button>
        ))}
      </div>

      <div className="task-content">
        <h2>{task.title}</h2>
        <div className="variant-badge">ვარიანტი {task.selectedVariant.id} — {task.selectedVariant.name}</div>

        <div className="task-description">
          {task.selectedVariant.description.split('\n').map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="data-panel">
          <div className="data-header">
            <span>მონაცემები</span>
            <button onClick={handleCopyData} className="btn btn-copy">
              {copied ? 'დაკოპირდა!' : 'კოპირება'}
            </button>
          </div>
          <pre className="data-code">{task.selectedVariant.dataCode}</pre>
        </div>

        <div className="editor-console-wrapper">
          <div className="editor-section">
            <label>შენი კოდი:</label>
            <textarea
              value={answers[currentTask]}
              onChange={(e) => {
                const newAnswers = [...answers]
                newAnswers[currentTask] = e.target.value
                setAnswers(newAnswers)
                if (checked[currentTask]) {
                  const newChecked = [...checked]
                  newChecked[currentTask] = false
                  setChecked(newChecked)
                }
              }}
              placeholder="ჩაწერე შენი JavaScript კოდი აქ..."
              className="code-editor"
              spellCheck={false}
            />
          </div>

          <div className="console-section">
            <label>Console:</label>
            <div className="console-output">
              {consoleLogs.length === 0 && (
                <span className="console-placeholder">კოდის გაშვების შემდეგ console.log აქ გამოჩნდება...</span>
              )}
              {consoleLogs.map((log, i) => (
                <div key={i} className={`console-line ${log.type}`}>
                  <span className="console-prefix">&gt;</span> {log.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {checked[currentTask] && (
          <div className={`score-result ${scores[currentTask] >= 20 ? 'good' : scores[currentTask] >= 12 ? 'ok' : 'bad'}`}>
            ამ თასქის ქულა: {scores[currentTask]}/25
            {scores[currentTask] === 25 && ' — სრულყოფილი!'}
            {scores[currentTask] >= 20 && scores[currentTask] < 25 && ' — კარგი!'}
            {scores[currentTask] >= 12 && scores[currentTask] < 20 && ' — საშუალო'}
            {scores[currentTask] < 12 && ' — სცადე თავიდან'}
          </div>
        )}

        <div className="action-buttons">
          <button onClick={handleRun} className="btn btn-run" disabled={!answers[currentTask].trim()}>
            გაშვება
          </button>
          <button onClick={handleCheck} className="btn btn-check" disabled={!answers[currentTask].trim()}>
            შემოწმება
          </button>

          {currentTask > 0 && (
            <button onClick={() => handleTaskChange(currentTask - 1)} className="btn btn-prev">
              ← წინა
            </button>
          )}
          {currentTask < 3 && (
            <button onClick={() => handleTaskChange(currentTask + 1)} className="btn btn-next">
              შემდეგი →
            </button>
          )}

          <button onClick={handleFinish} className="btn btn-finish">
            ტესტის დასრულება
          </button>
        </div>
      </div>
    </div>
  )
}

export default Exam
