/* eslint-disable @typescript-eslint/no-var-requires */
import { Listener } from 'discord-akairo'
import { Koreanbots } from 'koreanbots'
// eslint-disable-next-line @typescript-eslint/no-var-requires

const token =
  process.env.KRBOTS_TOKEN || require('../../config.json').api.koreanbots

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
    if (!token) {
      console.log('koreanbots token is null.')
    } else {
      const koreanbots = new Koreanbots({
        api: {
          token,
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
