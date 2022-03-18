import React, {useState} from 'react'
import {Typography, Button, Tooltip} from 'antd'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {truncateString} from '../../utils/helpers'

const {Title} = Typography

function UserInfo() {
  const [toolTipText, setToolTipText] = useState('copy')
  const address = '0x7860466dfe77152df6f5fe31efa189dddb1358f3'
  return (
    <div
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 90, flexDirection: 'column'}}
    >
      <div>
        <Title level={2}>Likono</Title>
      </div>
      <div>
        <CopyToClipboard text={address}>
          <Tooltip title={toolTipText}>
            <Button
              type="primary"
              shape="round"
              onClick={() => {
                setToolTipText('copied')
                // @ts-ignore
                setTimeout(() => setToolTipText('copy'), 1000)
              }}
            >
              {truncateString(address, address.length / 3)}
            </Button>
          </Tooltip>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default UserInfo
