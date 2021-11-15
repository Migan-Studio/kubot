import { Listener } from 'discord-akairo'
import { Koreanbots } from 'koreanbots'

export default class Ready extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    })
  }

  exec() {
    console.log(`Login: ${this.client.user!.username}`)
    console.log('======================================')
    if (this.client.user!.id === '889040508473724958') {
      console.log('this is Test bot.')
    } else {
      const koreanbots = new Koreanbots({
        api: {
          token: process.env.KR_TOKEN!,
        },
        clientID: this.client.user!.id!,
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
    this.client.user!.setActivity(`${prefix[0]}도움말`, { type: 'WATCHING' })
  }
}
