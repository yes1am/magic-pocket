import React, { useState, Component } from 'react'
import Trigger from './trigger'

export default (props) => {
  const [visible, setVisible] = useState(false)
  return <Trigger
    action={['click']}
    onVisibleChange={(visible) => { setVisible(visible) }}
    popup={<span>123</span>}
    visible={visible}
  >
    <span
      style={{
        marginTop: 20,
        display: 'inline-block'
      }}
    >
      hello
    </span>
  </Trigger>
}

// function forceRelayout (elem) {
//   var originalStyle = elem.style.display
//   elem.style.display = 'none'
//   elem.offsetHeight; // eslint-disable-line

//   elem.style.display = originalStyle
// }

// export default class extends Component {
//   constructor (props) {
//     super(props)
//   }
//   componentDidMount () {
//     const div = document.getElementById('test')
//     div && div.scrollTop
//     div.classList.add('active')
//     console.log(div)

//     setTimeout(() => {
//       div && div.scrollTop
//       console.log('timeout')
//       div && div.scrollTop
//     }, 1000)
//   }
//   render () {
//     return <div id='test'>
//       test
//     </div>
//   }
// }
