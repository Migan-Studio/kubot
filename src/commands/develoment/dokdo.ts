import { Command } from 'discord-akairo'
import { Message } from 'discord.js'

export default class DokdoCommand extends Command {
  constructor() {
    super('dokdo', {
      aliases: ['dokdo', 'dok'],
      ownerOnly: true,
    })
  }

  exec(msg: Message) {
    this.client.dokdo.options.prefix = msg.util?.parsed?.prefix
    this.client.dokdo.run(msg)
  }
}
