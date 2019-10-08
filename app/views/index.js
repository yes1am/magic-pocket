import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
// import Container from './containers'

const useCountDown = (initCount = 0, endCallback) => {
  const [count, setCount] = useState(initCount)
  const [isStarted, setIsStarted] = useState(false)
  const countRef = useRef()

  useEffect(() => {
    // use ref to store value
    // see: https://zh-hans.reactjs.org/docs/hooks-faq.html#why-am-i-seeing-stale-props-or-state-inside-my-function
    countRef.current = count
  })

  function doCountDown () {
    const newCount = countRef.current ? countRef.current - 1 : countRef.current
    setCount(newCount)
    if (!isStarted) {
      setIsStarted(true)
    }
    if (newCount === 0) {
      if (endCallback) {
        endCallback()
      }
    } else {
      setTimeout(() => {
        doCountDown()
      }, 1000)
    }
  }

  return [count, doCountDown, isStarted]
}

function App () {
  const [count, startCount, isStarted] = useCountDown(20, () => { console.log('计数') })
  return <div onClick={startCount}>
    count: {isStarted ? count : '点击开始计数'}
  </div>
}

ReactDOM.render(
  // <Container.Trigger />,
  <App />,
  document.getElementById('root')
)
