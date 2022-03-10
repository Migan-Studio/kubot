import { Argument, Command } from 'discord-akairo'
import { Formatters, Message, Team, User } from 'discord.js'

export default class SupportCommand extends Command {
  constructor() {
    super('support', {
      aliases: ['support', '문의'],
      args: [
        {
          id: 'content',
          type: Argument.union('string'),
          prompt: {
            start: '문의할 사항을 알려주세요',
          },
        },
      ],
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  exec(msg: Message, { content }: { content?: string }) {
    const a = msg.content
      .slice(msg.util?.parsed?.prefix?.length)
      .trim()
      .split(/ +/g)
      .join(' ')
    if (!a) return msg.reply('문의사항을 적어주세요!')
    let user
    if (msg.client.application?.owner instanceof User) {
      user = msg.client.application?.owner?.id
      msg.client.users.fetch(user as string).then(user =>
        user.send(
          `새문의가 왔어요!\n문의 내용: ${a}\n문의 작성시간: ${Formatters.time(
            Math.floor(msg.createdTimestamp / 1000)
          )} (${Formatters.time(Math.floor(msg.createdTimestamp / 1000), 'R')})
문의 작성자: ${msg.author.tag} (${msg.author.id})`
        )
      )
      msg.reply(
        `문의를 성공적으로 보냈어요!\n문의 내용: ${a}\n문의 작성시간: ${Formatters.time(
          Math.floor(msg.createdTimestamp / 1000)
        )} (${Formatters.time(Math.floor(msg.createdTimestamp / 1000), 'R')})`
      )
    } else if (msg.client.application?.owner instanceof Team) {
      user = msg.client.application?.owner?.ownerId
      msg.client.users.fetch(user as string).then(user =>
        user.send(
          `새문의가 왔어요!\n문의 내용: ${a}\n문의 작성시간: ${Formatters.time(
            Math.floor(msg.createdTimestamp / 1000)
          )} (${Formatters.time(Math.floor(msg.createdTimestamp / 1000), 'R')})
문의 작성자: ${msg.author.tag} (${msg.author.id})`
        )
      )
      msg.reply(
        `문의를 성공적으로 보냈어요!\n문의 내용: ${a}\n문의 작성시간: ${Formatters.time(
          Math.floor(msg.createdTimestamp / 1000)
        )} (${Formatters.time(Math.floor(msg.createdTimestamp / 1000), 'R')})`
      )
    }
  }
}
