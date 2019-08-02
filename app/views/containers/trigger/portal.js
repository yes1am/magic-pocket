import { Component } from 'react'
import ReactDOM from 'react-dom'

import PropTypes from 'prop-types'

class Portal extends Component {
  componentDidMount () {
    this.createContainer()
  }

  componentWillUnmount () {
    this.removeContainer()
  }

  createContainer () {
    // eslint-disable-next-line
    const { getPopupContainer, document = window.document } = this.props
    const popupContainer = document.createElement('div')
    popupContainer.style.position = 'absolute'
    popupContainer.style.top = '0'
    popupContainer.style.left = '0'
    popupContainer.style.width = '100%'
    const mountNode = getPopupContainer
      ? getPopupContainer()
      : document.body
    mountNode.appendChild(popupContainer)
    this.container = popupContainer
    this.forceUpdate()
  }

  removeContainer () {
    if (this.container) {
      this.container.parentNode.removeChild(this.container)
    }
  }

  render () {
    if (this.container) {
      return ReactDOM.createPortal(this.props.children, this.container)
    }
    return null
  }
}

Portal.propTypes = {
  getPopupContainer: PropTypes.func
}

export default Portal
