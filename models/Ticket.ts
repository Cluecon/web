import { IUser } from './user'

export type ITicket = {
  sessionId: string
  createdAt: string
  owner: IUser
}
