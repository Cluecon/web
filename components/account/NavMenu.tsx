import React, {useState, useEffect} from 'react'
import {Menu} from 'antd'
import {AppstoreOutlined, UnorderedListOutlined} from '@ant-design/icons'
import {useQueryState} from 'next-usequerystate'

function NavMenu() {
  const [current, setCurrent] = useState('UnorderedListOutlined')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tab, setTab] = useQueryState('tab')

  useEffect(() => {
    setTab('upcoming')
  }, [])

  return (
    <Menu
      onClick={(e) => setCurrent(e.key)}
      selectedKeys={[current]}
      mode="horizontal"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      }}
      onSelect={(selected) => {
        setTab(selected.key)
      }}
    >
      <Menu.Item key="upcoming" icon={<UnorderedListOutlined />}>
        Upcoming
      </Menu.Item>
      <Menu.Item key="myEvents" icon={<AppstoreOutlined />}>
        My Events
      </Menu.Item>
    </Menu>
  )
}

export default NavMenu
