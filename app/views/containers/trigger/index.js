import React, { Component } from 'react'
import Portal from './portal'

export default class componentName extends Component {
  render () {
    return (
      <div>
        <Portal>
          <div>123</div>
        </Portal>
        trigger
      </div>
    )
  }
}
