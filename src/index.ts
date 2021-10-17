import dotenv from 'dotenv'
dotenv.config()
import { Client, Intents, IntentsString } from 'discord.js'
import { Command } from 'discommand'
import Dokdo from 'dokdo'
import path = require('path')

const client = new Client({
  intents: Object.keys(Intents.FLAGS) as IntentsString[],
})
const cmd = new Command(client, {
  prefix: '--',
  path: path.join(__dirname, 'commands'),
  loadType: 'FOLDER',
})
const DokdoHandler = new Dokdo(client, {
  prefix: cmd.prefix,
  noPerm: msg => {
    msg.react('❌')
    msg.reply('어라? 당신은 개발자가 아닌데요?')
  },
  globalVariable: { cmd },
})

client
  .on('ready', () => {
    client.user!.setActivity(`${cmd.prefix}도움말`, { type: 'WATCHING' })
    console.log(`Login: ${client.user!.username}`)
    console.log('======================================')
  })
  .on('messageCreate', msg => {
    if (msg.author.bot || msg.channel.type == 'DM') return
    DokdoHandler.run(msg)
  })

cmd.loadCommand()

cmd.run()

client.login(process.env.TOKEN)
