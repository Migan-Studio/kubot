import { config } from 'dotenv'
import { Client, Intents, IntentsString } from 'discord.js'
import { Command } from 'discommand'
import Dokdo from 'dokdo'
import path = require('path')
import { Slash } from 'discommand-slash'
import { Koreanbots } from 'koreanbots'
config()

const client = new Client({
  intents: Object.keys(Intents.FLAGS) as IntentsString[],
})
const cmd = new Command(client, {
  prefix: 'k!',
  path: path.join(__dirname, 'commands'),
  loadType: 'FOLDER',
})
const slash = new Slash(client, {
  loadType: 'FOLDER',
  path: path.join(__dirname, 'slashCommands'),
})
const DokdoHandler = new Dokdo(client, {
  prefix: cmd.prefix,
  noPerm: msg => {
    msg.react('❌')
    msg.reply('어라...? 일단 권한이...')
  },
  globalVariable: { cmd, slash },
})

client
  .on('ready', () => {
    console.log(`Login: ${client.user!.username}`)
    console.log('======================================')
    if (client.user!.id! === '889040508473724958') {
      console.info('this is test bot!')
      cmd.prefix = 't!'
    } else {
      const koreanbots = new Koreanbots({
        api: {
          token: process.env.KR_TOKEN!,
        },
        clientID: client.user!.id!,
      })
      koreanbots.mybot
        .update({
          servers: client.guilds.cache.size as number,
          shards: client.shard?.count,
        })
        .then(res =>
          console.log(
            '서버 수를 정상적으로 업데이트하였습니다!\n반환된 정보:' +
              JSON.stringify(res)
          )
        )
        .catch(console.error)
      setInterval(
        () =>
          koreanbots.mybot
            .update({
              servers: client.guilds.cache.size as number,
              shards: client.shard?.count,
            })
            .catch(console.error),
        600000
      )
    }
    client.user!.setActivity(`${cmd.prefix}도움말`, { type: 'WATCHING' })
  })
  .on('messageCreate', msg => {
    if (msg.author.bot || msg.channel.type == 'DM') return
    DokdoHandler.run(msg)
  })

cmd.loadCommand()
slash.LoadCommand()

slash.run()
cmd.run()

client.login(process.env.TOKEN)
