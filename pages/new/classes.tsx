import React from 'react'
import {Form, Input, Button, Space, Typography, InputNumber} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import Link from 'next/link'
import styles from '../../styles/New.module.css'

const {Title} = Typography

function Classes() {
  const [form] = Form.useForm()
  return (
    <>
      <div className={styles.container}>
        <Form
          name="dynamic_form_nest_item"
          onFinish={(vals) => {
            console.log('vals', vals)
          }}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, {add, remove}) => (
              <>
                <div className={styles.content}>
                  <Title style={{textAlign: 'center'}}>Ticket categories</Title>
                  <div className={styles.description}>
                    {/* <Text>Choose a name that will give get people excited about your event. Feel free to get creative! You can edit this later if you change your mind.</Text> */}
                  </div>
                  <div className={styles.inputWrapper}>
                    <>
                      {fields.map(({key, name, ...restField}) => (
                        <Space
                          key={key}
                          style={{display: 'flex', marginBottom: 8, justifyContent: 'center', alignItems: 'center'}}
                          align="baseline"
                        >
                          <Form.Item {...restField} name={[name, 'Name']}>
                            <Input size="large" className={styles.input} placeholder="Name" />
                          </Form.Item>
                          <Form.Item {...restField} name={[name, 'price']}>
                            <InputNumber size="large" className={styles.input} addonBefore="$" defaultValue={0} />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                          Add Category
                        </Button>
                      </Form.Item>
                    </>
                  </div>
                </div>
                <div className={styles.footer}>
                  <div className={styles.back}>
                    <Link href="/new/location">
                      <a>
                        <Button className={styles.button} shape="round" size="large" htmlType="submit">
                          Back
                        </Button>
                      </a>
                    </Link>
                  </div>
                  <div className={styles.next}>
                    <Link href="/new/date">
                      <a>
                        <Button
                          className={styles.button}
                          type="primary"
                          shape="round"
                          size="large"
                          onClick={() => {
                            console.log('fields', form.getFieldValue('users'))
                          }}
                        >
                          Next
                        </Button>
                      </a>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </>
  )
}

export default Classes
