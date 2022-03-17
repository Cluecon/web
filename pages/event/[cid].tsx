import React from 'react'
import {Typography, Card, Image} from 'antd'
import styles from '../../styles/Details.module.css'
import DetailsAffix from '../../components/Event/Affix/DetailsAffix'
import EventBody from '../../components/Event/Body/EventBody'
import {EnvironmentOutlined, FieldTimeOutlined} from '@ant-design/icons'

const {Title, Text} = Typography

function EventDetails() {
  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
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
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.body}>
          <EventBody />
        </div>
        <div className={styles.sticker}>
          <DetailsAffix />
        </div>
      </div>
      <div style={{marginTop: 30}}>
        <Title style={{textAlign: 'center'}} level={1}>
          Related
        </Title>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
          {renderRelated()}
        </div>
      </div>
    </div>
  )
}

export default EventDetails
