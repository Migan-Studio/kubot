import { loadType } from 'discommand'

export type KubotClientOptions = {
  ownerID: string
  loadType: loadType
  path: string
}
