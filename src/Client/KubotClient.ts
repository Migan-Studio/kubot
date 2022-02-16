import { Intents } from 'discord.js'
import BasedClient from './BasedClient'
import path from 'path'
import { CommandHandler } from 'discommand'
import config from '../../config.json'
import { KubotClientOptions } from './type'

const options: KubotClientOptions = {
  ownerID: config.bot.owner_id,
  loadType: 'FOLDER',
  path: path.join(__dirname, '..', 'Commands'),
}

export default class extends BasedClient {
  public constructor() {
    super(
      {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
        allowedMentions: {
          repliedUser: false,
        },
      },
      options
    )
    this.BotOptions = options
  }

  public discommand: CommandHandler = new CommandHandler(this, {
    path: this.BotOptions.path,
    loadType: this.BotOptions.loadType,
  })

  public start() {
    this.login(config.api.discord)
    this.discommand.CommandLoadAll()
  }
}
