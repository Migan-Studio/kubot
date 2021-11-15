import { Argument, Command } from 'discord-akairo'
import { Message, Permissions } from 'discord.js'

export = class extends Command {
  constructor() {
    super('clear', {
      aliases: ['clear', '청소'],
      args: [
        {
          id: 'limit',
          type: Argument.union('Number'),
          prompt: {
            start: '청소할 채팅 갯수를 알려주세요',
          },
        },
      ],
    })
  }
  async exec(msg: Message, { limit }: { limit: number }) {
    if (!msg.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 메세지 관리하기 권한이 없으시네요`
      )

    if (!msg.guild?.me?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES))
      return msg.reply('어라..? 일단 이봇에게 메세지 관리하기 권한이 없어요')

    if (!limit) return msg.reply('지울 메세지의 갯수를 알려주세요!')

    if (Number(limit) > 100)
      return msg.reply({
        content: '100까지만 가능해요.',
      })
    if (Number(limit) < 0)
      return msg.reply({
        content: '0위로 해주셔야 해요',
      })
    if (isNaN(Number(limit)))
      return msg.reply('지울 메세지의 갯수는 숫자여야해요!')

    await msg.channel.messages
      .fetch({ limit: Number(limit) })
      .then(messages => {
        msg.guild?.channels
          .fetch(msg.channelId)
          .then(a => {
            // @ts-ignore
            a.bulkDelete(messages)
            msg.channel.send(`채팅 ${limit}개를 청소했어요!`)
          })
          .catch((err: Error) => {
            msg.reply({
              content: `예외가 발생했어요!\n에러 메세지: ${err.message}`,
            })
          })
      })
  }
}
