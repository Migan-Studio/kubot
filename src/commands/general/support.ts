import { Command } from 'discord-akairo'
import { Formatters, Message, Team, User } from 'discord.js'

export default class SupportCommand extends Command {
  constructor() {
    super('support', {
      aliases: ['support', '문의'],
      args: [
        {
          id: 'content',
          prompt: {
            start: '문의할 사항을 알려주세요',
          },
        },
      ],
    })
  }
  exec(msg: Message, { content }: { content?: string }) {
    if (!content) return msg.reply('문의사항을 적어주세요!')
    let user
    if (msg.client.application?.owner instanceof User) {
      user = msg.client.application?.owner?.id
      msg.client.users
        .fetch(user!)
        .then(user =>
          user.send(
            `새문의가 왔어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
              Math.floor(msg.createdTimestamp / 1000)
            )}`
          )
        )
      msg.reply(
        `문의를 성공적으로 보냈어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
          Math.floor(msg.createdTimestamp / 1000)
        )}`
      )
    } else if (msg.client.application?.owner instanceof Team) {
      user = msg.client.application?.owner?.ownerId
      msg.client.users
        .fetch(user!)
        .then(user =>
          user.send(
            `새문의가 왔어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
              Math.floor(msg.createdTimestamp / 1000)
            )}`
          )
        )
      msg.reply(
        `문의를 성공적으로 보냈어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
          Math.floor(msg.createdTimestamp / 1000)
        )}`
      )
    }
  }
}
