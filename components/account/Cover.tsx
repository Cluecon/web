import React from 'react'
import {Image, Avatar} from 'antd'
import {UserOutlined} from '@ant-design/icons'

function Cover() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <div>
        <Image
          preview={false}
          src="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
          alt="Picture of the author"
          width="100vw"
          height="30vh"
          style={{objectFit: 'cover'}}
        />
      </div>
      <div style={{position: 'absolute', bottom: '-60px'}}>
        <Avatar size={150} icon={<UserOutlined />} />
      </div>
    </div>
  )
}

export default Cover
