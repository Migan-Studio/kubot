import dotenv from 'dotenv'
dotenv.config()
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo'
import { Intents, IntentsString } from 'discord.js'
import path = require('path')
import Dokdo from 'dokdo'
import { Slash } from 'discommand-slash'

declare module 'discord-akairo' {
  interface AkairoClient {
    dokdo: Dokdo
    commandHandler: CommandHandler
    listenerHandler: ListenerHandler
    slash: Slash
  }
}

declare module 'discord.js' {
  interface Message {
    client: AkairoClient
  }
}
export default class KubotClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: JSON.parse(process.env.OWNER_ID!),
      },
      {
        intents: Object.keys(Intents.FLAGS) as IntentsString[],
      }
    )
  }

  public commandHandler: CommandHandler = new CommandHandler(this, {
    directory: path.join(__dirname, '..', 'commands'),
    prefix: JSON.parse(process.env.PREFIX!),
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
    prefix: JSON.parse(process.env.PREFIX!)[0],
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
    this.slash.run()
    this.login(process.env.TOKEN)
  }
}
