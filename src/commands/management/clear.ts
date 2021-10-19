import { MessageCommand } from 'discommand'
import { Message, Permissions } from 'discord.js'

export = class extends MessageCommand {
  name = '청소'
  aliases = ['clear']
  // @ts-ignore
  async execute(msg: Message, args: number[]) {
    if (!msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 메세지 관리하기 권한이 없으시네요`
      )

    if (!msg.guild?.me?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return msg.reply('어라..? 일단 이봇에게 메세지 관리하기 권한이 없어요')

    if (!args[0]) return msg.reply('지울 메세지의 갯수를 알려주세요!')

    if (args[0] > 100)
      return msg.reply({
        content: '100까지만 가능해요.',
      })
    if (args[0] < 0)
      return msg.reply({
        content: '0위로 해주셔야 해요',
      })
    if (isNaN(args[0])) return msg.reply('지울 메세지의 갯수는 숫자여야해요!')

    await msg.channel.messages.fetch({ limit: args[0] }).then(messages => {
      msg.guild?.channels
        .fetch(msg.channelId)
        .then(a => {
          // @ts-ignore
          a.bulkDelete(messages)
          msg.channel.send(`채팅 ${args[0]}개를 청소했어요!`)
        })
        .catch((err: Error) => {
          msg.reply({
            content: `예외가 발생했어요!\n에러 메세지: ${err.message}`,
          })
        })
    })
  }
}
