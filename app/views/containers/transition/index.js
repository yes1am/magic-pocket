import React, { useState } from 'react'
import Transition from '../trigger/react-transition-group/Transition.js'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 1
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

export default () => {
  const [inProp, setInProp] = useState(false)
  return (
    <div>
      <Transition in={inProp} timeout={duration}>
        {state => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
        I'm a fade Transition!
          </div>
        )}
      </Transition>
      <button onClick={() => setInProp(!inProp)}>
        Click to Enter
      </button>
    </div>
  )
}
