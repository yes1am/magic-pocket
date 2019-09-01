import React, { useState } from 'react'
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