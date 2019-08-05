import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './index.less'

class Popup extends Component {
  render () {
    const { visible } = this.props
    return (
      <ReactCSSTransitionGroup
        transitionAppear
        transitionAppearTimeout={10}
        component={React.Fragment}
        transitionName='rc-trigger-popup-zoom'
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >

        {visible && <div>
          {this.props.children}
        </div>}
      </ReactCSSTransitionGroup>
    )
  }
}

export default Popup
