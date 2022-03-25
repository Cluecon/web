export type IEvent = {
  uid: string
  ownerAddress: string
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
  ticketArt?: string
  covers?: string
}
