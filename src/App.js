import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Home } from './components/home/Home'
import { EmotionDetect } from './components/quiz/EmotionDetect'
import { EmotionReplicate } from './components/quiz/EmotionReplicate'

export const App = () => {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/replicate' component={EmotionReplicate} />
          <Route exact path='/quiz' component={EmotionDetect} />
        </Switch>
      </Router>
    </div>
  )
}
