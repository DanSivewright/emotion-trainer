import React from 'react'

export const Feedback = ({ children }) => {
  return <div className='feedback__wrapper'>{children}</div>
}

Feedback.Title = function FeedbackTitle ({ children }) {
  return <div className='feedback__title'>{children}</div>
}

Feedback.Score = function FeedbackScore ({ children }) {
  return <div className='feedback__score'>{children}</div>
}

Feedback.Caption = function FeedbackCaption ({ children }) {
  return <div className='feedback__caption'>{children}</div>
}