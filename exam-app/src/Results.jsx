function Results({ studentName, scores, tasks, totalScore, onRestart }) {
  const hasBonus = totalScore >= 90

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
          <span className={`total-value ${totalScore >= 90 ? 'excellent' : totalScore >= 70 ? 'good' : 'bad'}`}>
            {totalScore}/100
          </span>
        </div>

        {hasBonus && (
          <div className="bonus-message">
            🎉 გილოცავ! შენ მიიღე საჩუქრად <strong>5 ქულა</strong> საშინაო დავალებაში!
          </div>
        )}

        {totalScore >= 70 && totalScore < 90 && (
          <div className="result-message good-message">
            კარგი შედეგია! განაგრძე მუშაობა! 💪
          </div>
        )}

        {totalScore < 70 && (
          <div className="result-message average-message">
            მეტი ვარჯიში გჭირდება. არ დანებდე! 📚
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
