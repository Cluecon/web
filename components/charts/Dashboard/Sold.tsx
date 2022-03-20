import React from 'react'
import {Card, Typography, Button, Progress} from 'antd'
import {ArrowRightOutlined} from '@ant-design/icons'
import Link from 'next/link'
import styles from '../../../styles/EventDashboard.module.css'
import {truncateString} from '../../../utils/helpers'

const {Title, Text} = Typography

function SoldCard() {
  return (
    <>
      <div>
        <Card className={styles.soldCard}>
          <div className={styles.soldCardHeader}>
            <Title level={3}>Total Tickets Sold</Title>
            <div>
              <Link href="/account/userCid?myEvents">
                <a>
                  <Button>
                    <Text style={{marginRight: 5}}>View Events</Text>
                    <ArrowRightOutlined />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.progressWrapper}>
            <div>
              <Progress type="circle" percent={75} strokeColor="#d818ff" width={200} />
            </div>
            <div className={styles.eventsProgressWrapper}>
              <div className={styles.eventProgress}>
                <Progress type="circle" percent={30} strokeColor="#DCFF18" width={50} />
                <Text className={styles.eventText}>{truncateString('March Madness', 13)}</Text>
              </div>
              <div className={styles.eventProgress}>
                <Progress type="circle" percent={90} strokeColor="#18FF24" width={50} />
                <Text className={styles.eventText}>{truncateString('Tom Brady Super bowl', 13)}</Text>
              </div>
              <div className={styles.eventProgress}>
                <Progress type="circle" percent={68} strokeColor="#FF6118" width={50} />
                <Text className={styles.eventText}>{truncateString('Lebron Passing Karl Malone', 13)}</Text>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default SoldCard
