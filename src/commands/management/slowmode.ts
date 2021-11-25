import { Command, Argument } from 'discord-akairo'
import { Message, TextChannel } from 'discord.js'

export default class SlowmodeCommand extends Command {
  // name = '슬로우모드'
  // aliases = ['slowmode']
  constructor() {
    super('slowmode', {
      aliases: ['slowmode', '슬로우모드'],
      args: [
        {
          id: 'second',
          type: Argument.union('Number'),
          prompt: {
            start: '슬로우모드를 설정할 초를 알려주세요',
          },
        },
      ],
    })
  }
  exec(msg: Message, { second }: { second: number }) {
    const channel = msg.channel as TextChannel
    if (!msg.guild)
      return msg.reply('이 명령어는 서버내에서만 사용할 수 있어요')
    if (!msg.member!.permissions.has('MANAGE_CHANNELS'))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 채널 관리하기 권한이 없으시네요`
      )
    if (!msg.guild.me?.permissions.has('MANAGE_CHANNELS'))
      return msg.reply(`어라..? 일단 이봇에게 채널 관리하기 권한이 없어요`)
    // if (!args[0]) return msg.reply('슬로우모드를 설정할 초를 알려주세요')
    // if (isNaN(Number(args[0])))
    // return msg.reply('이 인자는 숫자로만 주어줘야해요')
    if (second > 21600) return msg.reply('슬로우모드는 6시간 이하만 가능해요')
    channel.setRateLimitPerUser(Number(second))
    msg.reply(`슬로우모드를 ${second}초로 설정했어요`)
  }
}
