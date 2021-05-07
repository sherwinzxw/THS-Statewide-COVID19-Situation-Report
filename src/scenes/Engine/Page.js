import * as React from 'react'
import Form from './Form'
import { Card } from './../../components'

const Page = props => {
  const { layout, onChangeValue } = props
  return <div className="Page">
    <Card title="Data Request Form">
      {layout.map(o => <Form {...o} onChangeValue={onChangeValue} />)}
    </Card>
  </div>
}

export default Page
