import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { Intents, IntentsString, User } from 'discord.js'
import path = require('path')
import Dokdo from 'dokdo'
import { Slash } from 'discommand-slash'
import config from '../../config.json'
import express from 'express'

declare module 'discord-akairo' {
  interface AkairoClient {
    dokdo: Dokdo
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler
    slash: Slash
    getOwner(): User | undefined
  }
}

declare module 'discord.js' {
  interface Message {
    client: AkairoClient
  }

  interface CommandInteraction {
    client: AkairoClient
  }
}
export default class KubotClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: config.bot.owner_id,
      },
      {
        intents: Object.keys(Intents.FLAGS) as IntentsString[],
      }
    )
  }

  private app: express.Application = express()

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: path.join(__dirname, '..', 'commands'),
    prefix: config.bot.prefix,
    commandUtil: true,
    automateCategories: true,
    handleEdits: true,
    storeMessages: true,
  })

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: path.join(__dirname, 'Listeners'),
  })

  public slash = new Slash(this, {
    loadType: 'FOLDER',
    path: path.join(__dirname, '..', 'slashCommands'),
  })
  public dokdo = new Dokdo(this, {
    prefix: config.bot.prefix[0],
    noPerm: msg => {
      msg.react('❌')
      msg.reply('어라...? 일단 권한이...')
    },
    globalVariable: { slash: this.slash },
  })

  public async start() {
    this.commandHandler.loadAll()
    this.listenerHandler.loadAll()
    this.slash.LoadCommand()
    this.login(config.api.discord)

    this.app.get('/', (req, res) => {
      res.send('Kubot!')
    })
    this.app.listen(5000, () => console.log(`5000 port.`))
  }

  public getOwner() {
    if (Array.isArray(this.ownerID)) {
      for (const id of this.ownerID) {
        const user = this.users.cache.get(id)
        return user
      }
    } else if (!Array.isArray(this.ownerID)) {
      const user = this.users.cache.get(this.ownerID)
      return user
    }
  }
}
