import { useState, useEffect, useRef } from 'react'
import { checkAnswer, runCode } from './tasks'

const TOTAL_TIME = 70 * 60

const JS_SNIPPETS = [
  { label: 'for', detail: 'for loop', code: 'for (let i = 0; i < arr.length; i++) {\n  \n}' },
  { label: 'for...of', detail: 'for...of loop', code: 'for (const item of arr) {\n  \n}' },
  { label: 'for...in', detail: 'for...in loop', code: 'for (const key in obj) {\n  \n}' },
  { label: 'forEach', detail: '.forEach()', code: '.forEach((item, index) => {\n  \n})' },
  { label: 'while', detail: 'while loop', code: 'while (condition) {\n  \n}' },
  { label: 'if', detail: 'if statement', code: 'if (condition) {\n  \n}' },
  { label: 'if...else', detail: 'if...else', code: 'if (condition) {\n  \n} else {\n  \n}' },
  { label: 'function', detail: 'function declaration', code: 'function name(params) {\n  \n}' },
  { label: 'const', detail: 'const declaration', code: 'const name = ' },
  { label: 'let', detail: 'let declaration', code: 'let name = ' },
  { label: 'console.log', detail: 'console.log()', code: 'console.log()' },
  { label: 'map', detail: '.map()', code: '.map((item) => {\n  \n})' },
  { label: 'filter', detail: '.filter()', code: '.filter((item) => {\n  \n})' },
  { label: 'reduce', detail: '.reduce()', code: '.reduce((acc, item) => {\n  \n}, initialValue)' },
  { label: 'find', detail: '.find()', code: '.find((item) => )' },
  { label: 'switch', detail: 'switch statement', code: 'switch (expression) {\n  case value:\n    \n    break;\n  default:\n    \n}' },
  { label: 'try...catch', detail: 'try...catch', code: 'try {\n  \n} catch (error) {\n  console.log(error)\n}' },
  { label: 'arrow', detail: 'arrow function', code: 'const name = (params) => {\n  \n}' },
  { label: 'setTimeout', detail: 'setTimeout()', code: 'setTimeout(() => {\n  \n}, 1000)' },
  { label: 'setInterval', detail: 'setInterval()', code: 'setInterval(() => {\n  \n}, 1000)' },
  { label: 'Object.keys', detail: 'Object.keys()', code: 'Object.keys(obj)' },
  { label: 'Object.values', detail: 'Object.values()', code: 'Object.values(obj)' },
  { label: 'Object.entries', detail: 'Object.entries()', code: 'Object.entries(obj)' },
  { label: 'sort', detail: '.sort()', code: '.sort((a, b) => a - b)' },
  { label: 'includes', detail: '.includes()', code: '.includes(value)' },
  { label: 'splice', detail: '.splice()', code: '.splice(start, deleteCount)' },
  { label: 'slice', detail: '.slice()', code: '.slice(start, end)' },
  { label: 'push', detail: '.push()', code: '.push(value)' },
  { label: 'pop', detail: '.pop()', code: '.pop()' },
  { label: 'join', detail: '.join()', code: '.join(separator)' },
  { label: 'split', detail: '.split()', code: '.split(separator)' },
  { label: 'indexOf', detail: '.indexOf()', code: '.indexOf(value)' },
  { label: 'Math.max', detail: 'Math.max()', code: 'Math.max(...arr)' },
  { label: 'Math.min', detail: 'Math.min()', code: 'Math.min(...arr)' },
  { label: 'Math.floor', detail: 'Math.floor()', code: 'Math.floor(value)' },
  { label: 'Math.round', detail: 'Math.round()', code: 'Math.round(value)' },
  { label: 'Math.random', detail: 'Math.random()', code: 'Math.random()' },
  { label: 'return', detail: 'return statement', code: 'return ' },
]

function Exam({ tasks, scores, setScores, onFinish }) {
  const [currentTask, setCurrentTask] = useState(0)
  const [answers, setAnswers] = useState(['', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const [checked, setChecked] = useState([false, false, false, false])
  const [consoleLogs, setConsoleLogs] = useState([])
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)
  const editorRef = useRef(null)
  const [suggestions, setSuggestions] = useState([])
  const [selectedSuggestion, setSelectedSuggestion] = useState(0)
  const [suggestionPos, setSuggestionPos] = useState({ top: 0, left: 0 })
  const [currentWord, setCurrentWord] = useState('')

  const getCurrentWord = (text, cursorPos) => {
    const before = text.slice(0, cursorPos)
    const match = before.match(/[\w.]*$/)
    return match ? match[0] : ''
  }

  const getCaretCoords = (textarea) => {
    const mirror = document.createElement('div')
    const style = window.getComputedStyle(textarea)
    const props = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing',
      'padding', 'paddingTop', 'paddingLeft', 'paddingRight', 'border', 'borderWidth',
      'boxSizing', 'whiteSpace', 'wordWrap', 'overflowWrap', 'tabSize', 'width']
    props.forEach(p => mirror.style[p] = style[p])
    mirror.style.position = 'absolute'
    mirror.style.visibility = 'hidden'
    mirror.style.whiteSpace = 'pre-wrap'
    mirror.style.wordWrap = 'break-word'
    mirror.style.overflow = 'hidden'
    mirror.style.height = 'auto'

    const text = textarea.value.substring(0, textarea.selectionEnd)
    mirror.textContent = text
    const marker = document.createElement('span')
    marker.textContent = '|'
    mirror.appendChild(marker)
    document.body.appendChild(mirror)

    const rect = textarea.getBoundingClientRect()
    const markerRect = marker.getBoundingClientRect()
    const mirrorRect = mirror.getBoundingClientRect()

    const top = rect.top + (markerRect.top - mirrorRect.top) - textarea.scrollTop + 20
    const left = rect.left + (markerRect.left - mirrorRect.left) - textarea.scrollLeft

    document.body.removeChild(mirror)
    return { top, left }
  }

  const handleAutocomplete = (e) => {
    const textarea = e.target
    const word = getCurrentWord(textarea.value, textarea.selectionEnd)
    setCurrentWord(word)

    if (word.length >= 2) {
      const lower = word.toLowerCase()
      const matched = JS_SNIPPETS.filter(s =>
        s.label.toLowerCase().startsWith(lower) || s.label.toLowerCase().includes(lower)
      ).slice(0, 8)

      if (matched.length > 0) {
        const coords = getCaretCoords(textarea)
        setSuggestionPos(coords)
        setSuggestions(matched)
        setSelectedSuggestion(0)
        return
      }
    }
    setSuggestions([])
  }

  const applySuggestion = (snippet) => {
    const textarea = editorRef.current
    if (!textarea) return
    const cursorPos = textarea.selectionEnd
    const text = textarea.value
    const wordStart = cursorPos - currentWord.length

    const newText = text.slice(0, wordStart) + snippet.code + text.slice(cursorPos)
    const newAnswers = [...answers]
    newAnswers[currentTask] = newText
    setAnswers(newAnswers)
    setSuggestions([])

    setTimeout(() => {
      textarea.focus()
      const newPos = wordStart + snippet.code.length
      textarea.setSelectionRange(newPos, newPos)
    }, 0)
  }

  const handleEditorKeyDown = (e) => {
    if (suggestions.length === 0) {
      if (e.key === 'Tab') {
        e.preventDefault()
        const textarea = e.target
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newAnswers = [...answers]
        newAnswers[currentTask] = answers[currentTask].substring(0, start) + '  ' + answers[currentTask].substring(end)
        setAnswers(newAnswers)
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 2
        }, 0)
      }
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedSuggestion(prev => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedSuggestion(prev => (prev - 1 + suggestions.length) % suggestions.length)
    } else if (e.key === 'Tab' || e.key === 'Enter') {
      e.preventDefault()
      applySuggestion(suggestions[selectedSuggestion])
    } else if (e.key === 'Escape') {
      setSuggestions([])
    }
  }

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
            <div className="editor-wrapper">
              <textarea
                ref={editorRef}
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
                  handleAutocomplete(e)
                }}
                onKeyDown={handleEditorKeyDown}
                onBlur={() => setTimeout(() => setSuggestions([]), 150)}
                placeholder="ჩაწერე შენი JavaScript კოდი აქ..."
                className="code-editor"
                spellCheck={false}
              />
              {suggestions.length > 0 && (
                <div
                  className="autocomplete-dropdown"
                  style={{ top: suggestionPos.top, left: suggestionPos.left }}
                >
                  {suggestions.map((s, i) => (
                    <div
                      key={s.label}
                      className={`autocomplete-item ${i === selectedSuggestion ? 'selected' : ''}`}
                      onMouseDown={(e) => { e.preventDefault(); applySuggestion(s) }}
                      onMouseEnter={() => setSelectedSuggestion(i)}
                    >
                      <span className="autocomplete-label">{s.label}</span>
                      <span className="autocomplete-detail">{s.detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
