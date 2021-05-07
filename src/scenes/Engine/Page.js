import * as React from 'react'
import Form from './Form'

const Page = props => {
  const { layout } = props
  return <div className="Page">
    {layout.map(o => <Form {...o} />)}
  </div>
}

export default Page
