import React, { useState, useRef, useEffect } from 'react'
import './style.less'
import './style.css'

function Counter ({ initialCount }) {
  const [count, setCount] = useState(initialCount)
  const prevCountRef = useRef(initialCount)
  console.log('counter init')
  useEffect(() => {
    prevCountRef.current = initialCount
  })

  console.log('initialCount', initialCount)
  console.log('prevCountRef.current', prevCountRef.current)
  console.log('count', count)
  // initialCount !== prevCountRef.current 确保在参数变化时执行setCount
  // 在参数变化时，setCount执行，再次执行到这里时，prevCountRef.current还没更新，initialCount !== prevCountRef.current 依旧成立。
  // 所以需要 count !== initialCount，因为此时 count已经更新了，确保不会重复执行
  if (initialCount !== prevCountRef.current && count !== initialCount) {
    setCount(initialCount)
  }

  return <div>
    <p>counter2:{count}</p>
    <div>
      <button onClick={() => { setCount(count + 1) }}>+</button>
    </div >
  </div >
}

function App () {
  const [count, setCount] = useState(0)
  console.log('app init')
  return (
    <div className='App'>
      <h3>hook ver</h3>
      <p>counter1:{count}</p>
      <div>
        <button onClick={() => { setCount(count + 1) }}>+</button>
      </div>
      <Counter initialCount={count} />
    </div>
  )
}

// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'
// const state = {
//   unit: 'px', // default, can be 'px' or '%'
//   // x: 130,
//   // y: 50,
//   width: 200,
//   height: 200
// }

// function App () {
//   const [crop, setCrop] = useState(state)
//   return <ReactCrop src='/static/bg.jpg'
//     crop={crop}
//     disabled
//     onChange={crop => setCrop(crop)}
//   />
// }

export default App
