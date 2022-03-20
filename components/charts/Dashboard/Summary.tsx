import React from 'react'
import {Card, Typography} from 'antd'
import styles from '../../../styles/EventDashboard.module.css'

const {Title, Text} = Typography

function Summary() {
  return (
    <>
      <Card className={styles.overviewStatsCard}>
        <Title level={5}>New Orders</Title>
        <div className={styles.overViewStats}>
          <Title style={{marginRight: 20}} level={3}>
            180
          </Title>
          <Text type="success">+50%</Text>
        </div>
      </Card>
      <Card className={styles.overviewStatsCard}>
        <Title level={5}>Total Views</Title>
        <div className={styles.overViewStats}>
          <Title style={{marginRight: 20}} level={3}>
            180
          </Title>
          <Text type="success">+50%</Text>
        </div>
      </Card>
      <Card className={styles.overviewStatsCard}>
        <Title level={5}>New Sales</Title>
        <div className={styles.overViewStats}>
          <Title style={{marginRight: 20}} level={3}>
            180
          </Title>
          <Text type="success">+50%</Text>
        </div>
      </Card>
    </>
  )
}

export default Summary
