import {EnvironmentOutlined, FieldTimeOutlined} from '@ant-design/icons'
import {Card, Image, Typography} from 'antd'
import {useRouter} from 'next/router'
import React from 'react'
import NavMenu from './NavMenu'
import styles from '../../styles/UserProfile.module.css'

function UserContent() {
  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  const router = useRouter()
  const tab = router.query.tab
  const {Title, Text} = Typography

  function renderRelated() {
    return events.map((e, i) => {
      return (
        <div key={i} style={{margin: 20}}>
          <Card
            hoverable
            style={{width: 300}}
            cover={<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
          >
            <Title level={3}>Event tile</Title>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <FieldTimeOutlined style={{fontSize: 24, marginRight: 20, marginLeft: 15}} />
              <Text>Sat, Apr 30, 12:00 PM To Sat, Apr 30, 16:00 PM</Text>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <EnvironmentOutlined style={{fontSize: '24px', marginRight: 10, marginLeft: 15}} />
              <Text>2734 Barkley street, santa clara</Text>
            </div>
          </Card>
        </div>
      )
    })
  }

  function renderContent() {
    if (tab === 'upcoming') {
      return <div className={styles.content}>{renderRelated()}</div>
    }

    if (tab === 'myEvents') {
      return <div className={styles.content}>{renderRelated()}</div>
    }
  }

  return (
    <div>
      <NavMenu />
      {renderContent()}
    </div>
  )
}

export default UserContent
