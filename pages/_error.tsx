import React from 'react'
import { Result, Button } from 'antd'
import { useRouter } from 'next/router'

function Error({ statusCode }: any) {
  const router = useRouter()
  if (statusCode == 404) {
    router.push('/404')
  } else {
    router.push('/500')
  }
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button onClick={() => router.push('/')} type="primary">
          Back Home
        </Button>
      }
    />
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
