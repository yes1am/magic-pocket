import React, { Component } from 'react'
import Portal from './portal'
import Popup from './popup.js'

function createChainedFunction () {
  const args = [].slice.call(arguments, 0)
  if (args.length === 1) {
    return args[0]
  }

  return function chainedFunction () {
    for (let i = 0; i < args.length; i++) {
      if (args[i] && args[i].apply) {
        args[i].apply(this, arguments)
      }
    }
  }
}

class Trigger extends Component {
  constructor (props) {
    super(props)
    const visible = typeof props.visible === 'undefined' ? props.defaultVisible : props.visible
    this.state = {
      visible
    }

    this.onClick = this.onClick.bind(this)
    this.setVisible = this.setVisible.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if ('visible' in nextProps) {
      if (nextProps.visible !== this.state.visible) {
        this.setState({ visible: nextProps.visible })
      }
    }
  }

  componentDidMount () {
    this.componentDidUpdate(
      {},
      {
        visible: false
      }
    )
  }

  getComponent () {
    this.componentRendered = true
    const { visible } = this.state
    const { popup } = this.props
    return <Popup
      visible={visible}
    >
      {typeof popup === 'function' ? popup() : popup}
    </Popup>
  }

  onClick (e) {
    e.preventDefault()
    this.setVisible(!this.state.visible)
  }

  setVisible (visible) {
    if (this.state.visible !== visible) {
      if (!('visible' in this.props)) {
        this.setState({
          visible
        })
      }
      this.props.onVisibleChange && this.props.onVisibleChange(visible)
    }
  }

  componentDidUpdate (_, prevState) {
    // if (prevState.visible !== this.state.visible) {
    // }
  }
  render () {
    const { visible } = this.state
    const child = React.Children.only(this.props.children)
    const childProps = child.props || {}

    const newChildProps = { key: 'trigger' }
    newChildProps.onClick = createChainedFunction(this.onClick, childProps.onClick)

    let trigger = React.cloneElement(child, newChildProps)
    let portal = null
    if (visible || this.componentRendered) {
      portal = <Portal key='portal'>
        {this.getComponent()}
      </Portal>
    }
    return [trigger, portal]
  }
}

export default Trigger
