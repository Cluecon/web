export type IEvent = {
  uid: string
  creatorAddress: string
  ipfsAdress: string
  title: string
  description: string
  location: {
    lat: number
    long: number
    address: string
  }

  tags?: string[]
  date: {
    startDate: string
    endDate: string
  }
  classes: {
    id: number
    name: string
    price: string
    amount: string
  }[]
  isFree: boolean
  ticketArt?: string
  covers?: string
  tokenId?: string
  owner?: string
  price?: string
}

export type IOTPCode = {
  code: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  eventId: string
  secret: string
  tokenId: string
  uid: string
  verified: boolean
}
