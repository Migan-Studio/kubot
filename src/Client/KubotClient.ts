/* eslint-disable @typescript-eslint/no-var-requires */
import { AkairoClient, ListenerHandler } from 'discord-akairo'
import { Intents, IntentsString } from 'discord.js'
import path = require('path')
import Dokdo from 'dokdo'
import { Slash } from 'discommand-slash'

declare module 'discord-akairo' {
  interface AkairoClient {
    dokdo: Dokdo
    listenerHandler: ListenerHandler
    slash: Slash
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
      {},
      {
        intents: Object.keys(Intents.FLAGS) as IntentsString[],
        allowedMentions: {
          repliedUser: false,
        },
      }
    )
  }

  public listenerHandler: ListenerHandler = new ListenerHandler(this, {
    directory: path.join(__dirname, 'Listeners'),
  })

  public slash = new Slash(this, {
    loadType: 'FOLDER',
    path: path.join(__dirname, '..', 'Commands'),
  })
  public dokdo = new Dokdo(this, {
    prefix: '!',
    noPerm: async msg => {
      await msg.react('❌')
      await msg.reply('어라...? 일단 권한이...')
    },
    globalVariable: { slash: this.slash },
  })

  public async start() {
    this.listenerHandler.loadAll()
    this.slash.LoadCommand()
    this.login(process.env.TOKEN || require('../../config.json').api.discord)
  }
}
