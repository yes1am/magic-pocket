import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import { Icon } from 'antd'
import './style.less'
import './style.css'

class HelloWorld extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  render () {
    const { visible } = this.state
    return (
      <React.Fragment>
        <ReactCSSTransitionGroup
          component={React.Fragment}
          transitionName='example'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >

          {visible && <div className='title'>
            Hello, express-react-dev-template
          </div>}
        </ReactCSSTransitionGroup>
        <button onClick={() => { this.setState({ visible: !this.state.visible }) }} >click</button>
        {/* <Icon type='android' /> */}
      </React.Fragment>
    )
  }
}

export default HelloWorld
