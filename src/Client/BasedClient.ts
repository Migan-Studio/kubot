import { CommandHandler } from 'discommand'
import { Client, ClientOptions } from 'discord.js'
import { KubotClientOptions } from './type'
import Package from '../../package.json'

declare module 'discord.js' {
  interface Client {
    discommand: CommandHandler
    version: string
  }
}

export default class extends Client {
  BotOptions: KubotClientOptions
  public constructor(
    ClientOptions: ClientOptions,
    BotOptions: KubotClientOptions
  ) {
    super(ClientOptions)
    this.BotOptions = BotOptions
  }

  public version = Package.version
}
