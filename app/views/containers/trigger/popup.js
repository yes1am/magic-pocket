import React, { Component } from 'react'
import Align from './align'
import { CSSTransition, Transition } from './react-transition-group'
import ReactDOM from 'react-dom'

import './index.less'

const duration = 200

const defaultStyle = {
  // transition: `all ${duration}ms ease-in-out`,
  // position: 'absolute',
  transformOrigin: 'top'
}

const transitionStyles = {
  entering: { animation: 'mymove 200ms ease-in' },
  entered: { animation: 'none' },
  exiting: { animation: 'mymove2 200ms ease-in' },
  exited: { animation: 'none' }
  // entering: { opacity: 1 },
  // entered: { opacity: 1 },
  // exiting: { opacity: 0 },
  // exited: { opacity: 0 }
}

const align = {
  points: ['tl', 'br']
}

class Popup extends Component {
  constructor (props) {
    super(props)
    this.getTarget = this.getTarget.bind(this)
  }
  getTarget () {
    return ReactDOM.findDOMNode(this.props.wrap)
  }
  render () {
    const { visible, children } = this.props
    return (
      <Transition mountOnEnter unmountOnExit appear in={visible} timeout={duration}>
        {state => {
          return <Align
            target={this.getTarget}
            monitorWindowResize
            align={align}
          >
            <div className='hello' style={{
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

// {/* <Align
//           target={this.getTarget}
//           monitorWindowResize
//           disabled={!visible}
//           align={align}
//         > */}
//         <div className={'hello'} style={{ position: 'absolute' }}>
//           {children}
//         </div>
//         {/* </Align> */}
