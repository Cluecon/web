import React, {useEffect} from 'react'
import {Typography, Card, Image} from 'antd'
import styles from '../../styles/Details.module.css'
import DetailsAffix from '../../components/Event/Affix/DetailsAffix'
import EventBody from '../../components/Event/Body/EventBody'
import {EnvironmentOutlined, FieldTimeOutlined} from '@ant-design/icons'
import MobileFooter from '../../components/Event/MobileFooter/MobileFooter'
import {EventWrapper, useEventContext} from '../../context/Event'

const {Title, Text} = Typography

const desc =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'

function EventDetails() {
  const {addEvent} = useEventContext()
  const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

  useEffect(() => {
    addEvent &&
      addEvent({
        cid: 'QiwiiwjjIIW9489djie9djdkdj',
        ownerAddress: '0xjsjiwjwikwnkn3993',
        title: 'Moulin Rouge! The Musical on Broadway',
        description: desc,
        location: {
          lat: 67.67,
          long: 98.56,
          address: '2734 Barkley street, santa clara',
        },

        tags: ['technology', 'soccer', 'basketball', 'music', 'creativity', 'dance'],
        date: {
          startDate: 'Sat, Apr 30, 12:00 PM ',
          endDate: ' Sat, Apr 30, 16:00 PM',
        },
        classes: [
          {id: 1, name: 'VIP', price: '500', amount: '200'},
          {id: 1, name: 'Early Birds', price: '100', amount: '400'},
          {id: 1, name: 'Regular', price: '250', amount: '200'},
        ],
        ticketArt: 'https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX',
        covers: 'https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX',
      })
  }, [])

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
    <EventWrapper>
      <div style={{position: 'relative'}}>
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
        <div className={styles.footer}>
          <MobileFooter />
        </div>
      </div>
    </EventWrapper>
  )
}

export default EventDetails
