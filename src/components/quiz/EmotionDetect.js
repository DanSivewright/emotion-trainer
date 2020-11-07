import React, { useState } from 'react'

export const EmotionDetect = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)

  // CONTANTS
  const expressions = ['angry', 'disgusted', 'happy', 'neutral', 'sad', 'surprised', 'fearful']
  const questions = [{ image: 'images/angry.png', emotion: 'angry' }, { image: 'images/disgusted.png', emotion: 'disgusted' }, { image: 'images/happy.png', emotion: 'happy' }, { image: 'images/neutral.png', emotion: 'neutral' }, { image: 'images/sad.png', emotion: 'sad' }, { image: 'images/surprised.png', emotion: 'surprised' }, { image: 'images/fearful.png', emotion: 'fearful' }]

  const handleAnswerOptionClick = (selectedEmotion, i) => {
    console.log('Selected Emotion: ', selectedEmotion)
    console.log('Actual Emotion: ', questions[currentQuestion].emotion)

    if (selectedEmotion === questions[currentQuestion].emotion) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      window.localStorage.setItem('quiz', score)
      window.location.href = '/'
    }
  }
  return (
    <div className='quiz__wrapper'>
      <img className='quiz__image' src={questions[currentQuestion].image} alt='' />

      <div className='quiz__content'>
        <div className='quiz__counter'>
          <span>{currentQuestion + 1}</span>/{questions.length}
        </div>
        <div className='quiz__question'>
          <div className='accent' />
          What emotion do you see?
        </div>
        <div className='quiz__options'>
          {expressions.map((exp, i) => (
            <div
              className='option'
              onClick={() => handleAnswerOptionClick(exp, i)}
              key={i}
            >
              {exp}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
