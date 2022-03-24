import { collection, QueryDocumentSnapshot, DocumentData, query, getDocs, doc, getDoc } from '@firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import { setDoc } from 'firebase/firestore' // for adding the Document to Collection
import { firestore } from '../config/fb'
import { IEvent } from '../models/event'

const eventsCollection = collection(firestore, 'Events')

export const getEvents = async () => {
  const eventsQuery = query(eventsCollection)
  const querySnapshot = await getDocs(eventsQuery)

  const result: QueryDocumentSnapshot<DocumentData>[] = []
  querySnapshot.forEach((snapshot) => {
    result.push(snapshot)
  })
  return result
}

export const saveEventToFirebase = async (event: IEvent) => {
  const timestamp: string = Date.now().toString()
  const uid = uuidv4()
  const _event = doc(firestore, `Events/${uid}`)
  const toSaveEvent = { ...event, createdAt: timestamp, uid: uid }
  try {
    await setDoc(_event, toSaveEvent)
    const savedEvent = await getFirebaseEventById(uid)
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
