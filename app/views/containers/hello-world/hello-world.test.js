import React from 'react'
import { shallow } from 'enzyme'
import HelloWorld from './index'

describe('hello-world', () => {
  it('match snapshot', () => {
    const el = shallow(<HelloWorld />)
    expect(el).toMatchSnapshot()
  })
})
