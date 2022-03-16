import React from 'react'
import {Button, Typography, Input} from 'antd'
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Link from 'next/link'
import styles from '../../styles/New.module.css'
import {useNewEventContext} from '../../context/newEvent'

const {Title} = Typography

function Location() {
  const {event, updateNewEvent} = useNewEventContext()
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Title style={{textAlign: 'center'}}>Where is your event located?</Title>
          <div className={styles.description}>{/* <Text>Feel free to be as descriptive as you wish</Text> */}</div>
          <div className={styles.inputWrapper}>
            <PlacesAutocomplete
              value={event?.location?.address}
              onChange={(add) =>
                updateNewEvent && updateNewEvent({...event, location: {...event?.location, address: add}})
              }
              onSelect={(add) => {
                geocodeByAddress(add)
                  .then((results) => getLatLng(results[0]))
                  .then(({lat, lng}) => {
                    updateNewEvent && updateNewEvent({...event, location: {lat: lat, long: lng, address: add}})
                  })
              }}
            >
              {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <div>
                  <Input
                    size="large"
                    className={styles.input}
                    {...getInputProps({
                      placeholder: 'Search Places ...',
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                        : {backgroundColor: '#ffffff', cursor: 'pointer'}
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.back}>
            <Link href="/new/description">
              <a>
                <Button className={styles.button} shape="round" size="large">
                  Back
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.next}>
            <Link href="/new/classes">
              <a>
                <Button className={styles.button} type="primary" shape="round" size="large">
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

export default Location
