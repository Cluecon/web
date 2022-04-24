import { collection, query, getDocs, doc, getDoc, where, orderBy, startAt, endAt, updateDoc } from '@firebase/firestore'
import { setDoc } from 'firebase/firestore' // for adding the Document to Collection
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { firestore } from '../config/fb'
import { ICodeData, IEvent, IOTPCode } from '../models/event'
import { ITicket } from '../models/Ticket'
import { IUser } from '../models/user'

const eventsCollection = collection(firestore, 'Events')
const storage = getStorage()

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

export const getUserByUsername = async (username: string) => {
  try {
    const users: IUser[] = []
    const usersRef = collection(firestore, 'Users')
    const q = query(usersRef, where('username', '==', username))
    const usersSnapshot = await getDocs(q)
    usersSnapshot.forEach((doc) => {
      users.push(doc.data() as IUser)
    })
    if (users.length) {
      return users[0]
    } else {
      return null
    }
  } catch (error) {
    console.log('error', error)
  }
}

export const createUser = async (user: IUser) => {
  const timestamp: string = Date.now().toString()
  const _user = doc(firestore, `Users/${user.uid}`)
  const toSaveUser = { ...user, createdAt: timestamp }
  try {
    await setDoc(_user, toSaveUser)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getUserById = async (uid: string) => {
  try {
    const userRef = doc(firestore, 'Users', uid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      return userSnap.data() as IUser
    } else {
      return undefined
    }
  } catch (error: any) {
    console.log('error', error)
    // throw new Error(error)
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

export const getFirebaseEventsByAdress = async (address: string) => {
  try {
    const events: IEvent[] = []
    const eventsRef = collection(firestore, 'Events')
    const q = query(eventsRef, where('creatorAddress', '==', address))
    const eventsSnapshot = await getDocs(q)
    eventsSnapshot.forEach((doc) => {
      events.push(doc.data() as IEvent)
    })
    return events
  } catch (error) {
    console.log('error', error)
  }
}

export const getCodesByEventId = async (eventId: string) => {
  try {
    const events: IOTPCode[] = []
    const eventsRef = collection(firestore, 'TicketsOTP')
    const q = query(eventsRef, where('eventId', '==', eventId))
    const eventsSnapshot = await getDocs(q)
    eventsSnapshot.forEach((doc) => {
      events.push(doc.data() as IOTPCode)
    })
    return events
  } catch (error) {
    console.log('error', error)
  }
}

export const getEventById = async (uid: string) => {
  try {
    const docRef = doc(firestore, 'Events', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as IEvent
    } else {
      throw new Error('not found')
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTicketCodeData = async (eventId: string, ownerAddress: string) => {
  try {
    const codes: ICodeData[] = []
    const codesRef = collection(firestore, 'TicketsOTP')
    const q = query(codesRef, where('ownerAddress', '==', ownerAddress))
    const codesSnapshot = await getDocs(q)
    codesSnapshot.forEach((doc) => {
      codes.push(doc.data() as ICodeData)
    })
    const eventCode = codes.filter((c) => c.eventId === eventId)
    return eventCode[0]
  } catch (error) {
    console.log(error)
  }
}

export const getOwnerTickets = async (eventId: string, userAddress: string) => {
  try {
    const events: ICodeData[] = []
    const codesRef = collection(firestore, 'TicketsOTP')
    const q = query(codesRef, where('eventId', '==', eventId))
    const codesSnapshot = await getDocs(q)
    codesSnapshot.forEach((doc) => {
      events.push(doc.data() as ICodeData)
    })
    const tickets = events.filter((c) => c.ownerAdress === userAddress)
    return tickets as ICodeData[]
  } catch (error) {
    console.log(error)
  }
}

export const startEvent = async (eventId: string) => {
  const eventsRef = doc(firestore, 'Events', eventId)
  await updateDoc(eventsRef, {
    isOngoing: true,
    startedTime: new Date().getTime(),
  })
}

export const stopEvent = async (eventId: string) => {
  const eventsRef = doc(firestore, 'Events', eventId)
  await updateDoc(eventsRef, {
    isOngoing: false,
    stoppedTime: new Date().getTime(),
  })
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

export const getEventsByBounds = async (bounds: string[][]) => {
  const promises: IEvent[] = []
  for (const b of bounds) {
    const eventsRef = collection(firestore, 'Events')
    const q = query(eventsRef, orderBy('geohash'), startAt(b[0]), endAt(b[1]))
    const eventsSnapshot = await getDocs(q)
    eventsSnapshot.forEach((doc) => {
      promises.push(doc.data() as IEvent)
    })
    return promises
  }
  const eventsQuery = query(eventsCollection)
  // get the todos
  const querySnapshot = await getDocs(eventsQuery)

  // map through todstripe trigger payment_intent.succeededos adding them to an array
  const result: IEvent[] = []
  querySnapshot.forEach((snapshot) => {
    result.push(snapshot.data() as IEvent)
  })
  return result
}

export const updateUserCover = async (cover: string, userId: string) => {
  const userRef = doc(firestore, 'Users', userId)
  await updateDoc(userRef, {
    coverPic: cover,
  })
}

export const updateUserAvatar = async (avatar: string, userId: string) => {
  const userRef = doc(firestore, 'Users', userId)
  await updateDoc(userRef, {
    profilePic: avatar,
  })
}

export const updateUserDetails = async (username: string, address: string, userId: string) => {
  const userRef = doc(firestore, 'Users', userId)
  const user = await getUserByUsername(username)
  if (user) {
    throw new Error('username already taken')
  } else {
    await updateDoc(userRef, {
      username: username,
      walletAddress: address,
    })
  }
}

export const getEventsByUserId = async (userId: string) => {
  try {
    const events: IEvent[] = []
    const eventsRef = collection(firestore, 'Events')
    const q = query(eventsRef, where('creatorUid', '==', userId))
    const eventsSnapshot = await getDocs(q)
    eventsSnapshot.forEach((doc) => {
      events.push(doc.data() as IEvent)
    })
    console.log('user events', events)
    return events
  } catch (error) {
    console.log(error)
  }
}

export const addTicketToFirebase = async (eventId: string, userId: string, sessionId: string) => {
  try {
    const event = await getEventById(eventId)
    if (!event) {
      throw new Error('Event not found!')
    } else {
      const user = await getUserById(userId)
      if (!user) {
        throw new Error('User not found!')
      } else {
        const timestamp: string = Date.now().toString()
        const _ticket = doc(firestore, `Events/${event.uid}/Tickets/${sessionId}`)
        const _ticketMetadata = {
          sessionId: sessionId,
          owner: user,
          createdAt: timestamp,
        }
        try {
          await setDoc(_ticket, _ticketMetadata)
          const savedTicket = await getFirebaseTicket(event.uid, _ticketMetadata.sessionId, user.uid)
          return savedTicket
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getFirebaseTicket = async (eventId: string, sessionId: string, userId: string) => {
  try {
    const docRef = doc(firestore, `Events/${eventId}/Tickets`, sessionId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const _t = docSnap.data() as ITicket
      if (_t.owner.uid !== userId) {
        throw new Error('not authorized')
      } else {
        return _t
      }
    } else {
      throw new Error('not found')
    }
  } catch (error: any) {
    throw new Error(error)
  }
}
