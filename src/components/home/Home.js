import React, { useState } from 'react'
import { Button } from '../shared/Button'
import { Card } from '../shared/layout/Card'
import { Feedback } from '../shared/layout/Feedback'
import { Header } from '../shared/layout/Header'

export const Home = () => {
  // eslint-disable-next-line
  const [feedback, setFeedback] = useState(window.localStorage.getItem('success'))
  // eslint-disable-next-line
  const [quiz, setQuiz] = useState(window.localStorage.getItem('quiz'))
  return (
    <>
      <Header />
      <div className='home__wrapper'>

        {feedback || quiz ? (
          <div className='home__greeting'>
            <p>Great Work Daniel,</p>
            <h2>Keep Going</h2>
          </div>
        ) : (
          <div className='home__greeting'>
            <p>Hi Daniel,</p>
            <h2>Welcome Back</h2>
          </div>
        )}
        {feedback && (
          <Feedback>
            <Feedback.Title>You detected all 7 emotions in:</Feedback.Title>
            <Feedback.Score>{feedback}s</Feedback.Score>
            <Feedback.Caption>Happy, Fearful, Angry, Disgusted, Surprised, Sad and Neutral</Feedback.Caption>
            <Button variant='gradient' location='/replicate'>Try Again</Button>
          </Feedback>
        )}
        {quiz && (
          <Feedback>
            <Feedback.Title>You scored: </Feedback.Title>
            <Feedback.Score>{quiz}/7</Feedback.Score>
            <Feedback.Caption>
              {quiz < 5 ? <p>Nice try! Take a break and give it your best next time.</p> : <p>Well done! You're really good at this</p>}
            </Feedback.Caption>
            <Button variant='gradient' location='/replicate'>Try Again</Button>
          </Feedback>
        )}
        <Card>
          <Card.Image source='/images/banner-pic.png' />
          <Card.Content>
            <Card.Title>Live Emotion Test</Card.Title>
            <Card.Body>Test your skills as we ask you to replicate a few emotions</Card.Body>
            <Button location='/replicate'>Start Now</Button>
          </Card.Content>
        </Card>
        <Card background='green'>
          <Card.Image source='/images/figure-3.png' />
          <Card.Content>
            <Card.Title>Emotion Quiz</Card.Title>
            <Card.Body>Lets see how good you are at identifying emotions</Card.Body>
            <Button location='/quiz'>Start Now</Button>
          </Card.Content>
        </Card>
      </div>
    </>
  )
}
