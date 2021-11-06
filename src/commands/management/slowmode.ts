import { MessageCommand } from 'discommand'
import { Message, TextChannel } from 'discord.js'

export = class extends MessageCommand {
  name = '슬로우모드'
  aliases = ['slowmode']
  execute(msg: Message, args: string[]) {
    const channel = msg.channel as TextChannel
    if (!msg.guild)
      return msg.reply('이 명령어는 서버내에서만 사용할 수 있어요')
    if (!msg.member!.permissions.has('MANAGE_CHANNELS'))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 채널 관리하기 권한이 없으시네요`
      )
    if (!msg.guild.me?.permissions.has('MANAGE_CHANNELS'))
      return msg.reply(`어라..? 일단 이봇에게 채널 관리하기 권한이 없어요`)
    if (!args[0]) return msg.reply('슬로우모드를 설정할 초를 알려주세요')
    if (isNaN(Number(args[0])))
      return msg.reply('이 인자는 숫자로만 주어줘야해요')
    channel.setRateLimitPerUser(Number(args[0]))
    msg.reply(`슬로우모드를 ${args[0]}초로 설정했어요`)
  }
}
