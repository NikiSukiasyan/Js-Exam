function Results({ studentName, scores, tasks, totalScore, onRestart }) {
  const adjustment = totalScore < 85 ? -1 : totalScore >= 90 ? 2 : 0
  const finalScore = Math.max(0, Math.min(100, totalScore + adjustment))

  return (
    <div className="results-container">
      <div className="results-card">
        <h1>ტესტის შედეგი</h1>
        <h2 className="student-name-result">{studentName}</h2>

        <div className="score-breakdown">
          {tasks.map((task, i) => (
            <div key={task.id} className="score-row">
              <span className="score-label">
                {task.title} (ვარიანტი {task.selectedVariant.id})
              </span>
              <span className={`score-value ${scores[i] >= 20 ? 'good' : scores[i] >= 12 ? 'ok' : 'bad'}`}>
                {scores[i]}/25
              </span>
            </div>
          ))}
        </div>

        <div className="total-score-display">
          <span>ჯამური ქულა:</span>
          <span className={`total-value ${finalScore >= 90 ? 'excellent' : finalScore >= 70 ? 'good' : 'bad'}`}>
            {totalScore}/100
            {adjustment !== 0 && (
              <span style={{ fontSize: '0.7em', marginLeft: '8px' }}>
                ({adjustment > 0 ? '+' : ''}{adjustment} = {finalScore})
              </span>
            )}
          </span>
        </div>

        {finalScore >= 90 && (
          <div className="bonus-message">
            🎉 გილოცავ! შენ მიიღე საჩუქრად <strong>2 ქულა</strong> საშინაო დავალებაში! (+2 ბონუს ქულა)
          </div>
        )}

        {finalScore >= 70 && finalScore < 90 && (
          <div className="result-message good-message">
            კარგი შედეგია! განაგრძე მუშაობა! 💪
          </div>
        )}

        {finalScore < 70 && (
          <div className="result-message average-message">
            მეტი ვარჯიში გჭირდება. არ დანებდე! 📚
          </div>
        )}

        {totalScore < 85 && (
          <div className="result-message penalty-message">
            ⚠️ 85-ზე ნაკლები ქულის გამო ჩამოგაკლდა 1 ქულა
          </div>
        )}

        <button onClick={onRestart} className="btn btn-primary btn-large">
          თავიდან დაწყება
        </button>
      </div>
    </div>
  )
}

export default Results
