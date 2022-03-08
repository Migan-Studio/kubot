import { Listener } from 'discord-akairo'
import { Koreanbots } from 'koreanbots'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../config.json')

const token = process.env.KRBotsToken || config.bot.KRBotsToken

export default class Ready extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    })
  }

  exec() {
    console.log(`Login: ${this.client.user?.username}`)
    console.log('======================================')
    if (!config.api.koreanbots) {
      console.log('koreanbots token is null.')
    } else {
      const koreanbots = new Koreanbots({
        api: {
          token: token as string,
        },
        clientID: this.client.user?.id as string,
      })
      koreanbots.mybot
        .update({
          servers: this.client.guilds.cache.size as number,
          shards: this.client.shard?.count,
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
              servers: this.client.guilds.cache.size as number,
              shards: this.client.shard?.count,
            })
            .catch(console.error),
        600000
      )
    }
    const prefix = this.client.commandHandler.prefix as string[]
    this.client.user?.setActivity(`${prefix[0]}도움말`, { type: 'WATCHING' })
  }
}
