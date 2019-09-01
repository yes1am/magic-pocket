import React, { Component } from 'react'
import Align from './align'
import { CSSTransition, Transition } from './react-transition-group'
import ReactDOM from 'react-dom'

import './index.less'

const duration = 200

const defaultStyle = {
  // transition: `all ${duration}ms ease-in-out`,
  position: 'absolute',
  transformOrigin: 'left',
  background: 'red'
}

const transitionStyles = {
  entering: { animation: 'mymove 200ms ease-in' },
  entered: { animation: 'none' },
  exiting: { animation: 'mymove2 200ms ease-in' },
  exited: { animation: 'none' }
}

const align = {
  points: ['tl', 'bl']
}

class Popup extends Component {
  constructor (props) {
    super(props)
    this.getTarget = this.getTarget.bind(this)
    this.node = null
    this.done = null
  }
  getTarget () {
    return ReactDOM.findDOMNode(this.props.wrap)
  }
  componentWillUnmount () {
    if (this.node) {
      this.node.removeEventListener('animationend', this.done)
    }
  }
  render () {
    const { visible, children } = this.props
    return (
      <Transition
        mountOnEnter
        unmountOnExit
        appear
        addEndListener={(node, done) => {
          // we need addEndListener or timeout to say: "my animation is complete"
          // but use timeout is not so reliable
          this.node = node
          this.done = done
          node.addEventListener('animationend', this.done)
        }}
        in={visible}
        timeout={duration}
      >
        {state => {
          return <Align
            target={this.getTarget}
            monitorWindowResize
            align={align}
          >
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              {children}
            </div>
          </Align>
        }}
      </Transition>
    )
  }
}

export default Popup
