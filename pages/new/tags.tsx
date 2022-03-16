import React, {useState, useEffect} from 'react'
import {Button, Typography, Input} from 'antd'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import {useNewEventContext} from '../../context/newEvent'

const {Title} = Typography

type ITag = {
  name: string
  isSelected: boolean
}

function Tags() {
  const [tags, setTags] = useState<ITag[]>([
    {name: 'sports', isSelected: false},
    {name: 'music', isSelected: false},
    {name: 'soccer', isSelected: false},
    {name: 'basketball', isSelected: false},
    {name: 'hiking', isSelected: false},
    {name: 'clubbing', isSelected: false},
  ])
  const [inputValue, setInputValue] = useState('')
  const {event, updateNewEvent} = useNewEventContext()

  useEffect(() => {
    console.log('present tags', event?.tags)
    if (event?.tags) {
      const presentTags = event.tags.map((t) => ({name: t, isSelected: true}))
      console.log(tags)
      setTags({...tags, ...presentTags})
    }
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title style={{textAlign: 'center'}}>Select some tags or enter new tags</Title>
          <div className={styles.description}></div>
          <div className={styles.inputWrapper}>
            <Input
              onKeyDown={(e) => {
                if (inputValue.length >= 3 && e.key == 'Enter') {
                  const newList = tags.filter((tag) => tag.name != inputValue)
                  setTags([...newList, {name: inputValue, isSelected: true}])
                  updateNewEvent && updateNewEvent({...event, tags: tags.map((t) => t.name)})
                  setInputValue('')
                }
              }}
              value={inputValue}
              className={styles.input}
              size="large"
              placeholder="Tag"
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className={styles.tags}>
            {tags.length > 0 &&
              tags.map((tag: {name: string; isSelected: boolean}, i: number) => (
                <Button
                  key={i}
                  style={{marginRight: 10, marginTop: 10}}
                  type={tag.isSelected ? 'primary' : 'dashed'}
                  shape="round"
                  size="large"
                  onClick={() => {
                    const newArray = tags.filter((t) => t.name != tag.name)
                    setTags([...newArray, {name: tag.name, isSelected: !tag.isSelected}])
                  }}
                >
                  {tag.name}
                </Button>
              ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/location">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Link href="/new/art">
              <a>
                <Button
                  className={styles.button}
                  type="primary"
                  shape="round"
                  size="large"
                  onClick={() => {
                    updateNewEvent && updateNewEvent({...event, tags: tags.map((t) => t.name)})
                  }}
                >
                  Next
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tags
