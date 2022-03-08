import { Listener } from 'discord-akairo'
import { Message } from 'discord.js'

export default class Ready extends Listener {
  constructor() {
    super('messageCreate', {
      emitter: 'client',
      event: 'messageCreate',
    })
  }

  exec(msg: Message) {
    this.client.dokdo.run(msg)
  }
}
