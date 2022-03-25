import { collection, query, getDocs, doc, getDoc } from '@firebase/firestore'
import { setDoc } from 'firebase/firestore' // for adding the Document to Collection
import { firestore } from '../config/fb'
import { IEvent } from '../models/event'

const eventsCollection = collection(firestore, 'Events')

export const saveEventToFirebase = async (event: IEvent) => {
  const timestamp: string = Date.now().toString()
  const _event = doc(firestore, `Events/${event.uid}`)
  const toSaveEvent = { ...event, createdAt: timestamp, uid: event.uid }
  try {
    await setDoc(_event, toSaveEvent)
    const savedEvent = await getFirebaseEventById(event.uid)
    return savedEvent
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getFirebaseEventById = async (uid: string) => {
  try {
    const eventRef = doc(firestore, 'Events', uid)
    const eventSnap = await getDoc(eventRef)
    if (eventSnap.exists()) {
      return eventSnap.data() as IEvent
    } else {
      return undefined
    }
  } catch (error: any) {
    console.log('error', error)
    // throw new Error(error)
  }
}

export const getFirebaseEvents = async () => {
  const eventsQuery = query(eventsCollection)
  // get the todos
  const querySnapshot = await getDocs(eventsQuery)

  // map through todos adding them to an array
  const result: IEvent[] = []
  querySnapshot.forEach((snapshot) => {
    result.push(snapshot.data() as IEvent)
  })
  return result
}
