import React from 'react'
import {Card, Image, Typography, Tag, Divider} from 'antd'
import {EnvironmentOutlined, FieldTimeOutlined} from '@ant-design/icons'

const description =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,  Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.'

const {Title, Text} = Typography

function EventBody() {
  const tags = ['soccer', 'basketball', 'footbal', 'music', 'jcole']

  function renderTags() {
    return tags.map((t, i) => (
      <Tag key={i} color="#d818ff">
        {t}
      </Tag>
    ))
  }
  return (
    <Card bodyStyle={{padding: '0'}}>
      <div>
        <Image
          src="https://dev-ipfs.clueconn.com/ipfs/QmS8LtBfH4WH47xcHrJvPi7rHWLAcennA6xmhShacHgqaX"
          alt="Picture of the author"
          width="100%"
          style={{borderRadius: '50px'}}
          preview={false}
        />
      </div>
      <div style={{marginTop: 30}}>
        <Title level={2}>Moulin Rouge! The Musical on Broadway</Title>
      </div>
      <div>
        <EnvironmentOutlined style={{fontSize: '24px', marginRight: 10, marginLeft: 15}} />
        <Text>2734 Barkley street, santa clara</Text>
        <Divider dashed orientation="left">
          Date
        </Divider>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <FieldTimeOutlined style={{fontSize: 24, marginRight: 20, marginLeft: 15}} />
          <Text>Sat, Apr 30, 12:00 PM To Sat, Apr 30, 16:00 PM</Text>
        </div>
        <Divider dashed orientation="left">
          Tags
        </Divider>
        <div style={{marginLeft: 15}}>{renderTags()}</div>
        <Divider dashed orientation="left">
          Description
        </Divider>
        <div style={{marginLeft: 15}}>
          <Text>{description}</Text>
        </div>
      </div>
    </Card>
  )
}

export default EventBody
