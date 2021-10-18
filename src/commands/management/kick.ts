import { MessageCommand } from 'discommand'
import { Message, Permissions } from 'discord.js'

export = class extends MessageCommand {
  name = '킥'
  aliases = ['추방', 'kick']
  async execute(msg: Message, args: string[]) {
    if (!msg.member?.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 멤버 킥하기 권한이 없으시네요`
      )
    if (!msg.guild?.me?.permissions.has(Permissions.FLAGS.KICK_MEMBERS))
      return msg.reply('어라..? 일단 이봇에게 멤버킥하기 권한이 없어요')
    let mentionMember = msg.mentions.members?.first()
    let reason = args.slice(1).join(' ')
    if (!reason) reason = ' 없음'

    if (!args[0]) return msg.reply('킥할 사용자를 지정하셨나요?')
    if (!mentionMember!.kickable)
      return msg.reply('이 사용자는 제가 킥을 못해요...')

    try {
      await mentionMember
        ?.send(
          `${mentionMember?.guild.name}에서 추방이 되셨습니다.
사유: ${reason}`
        )
        .catch(err =>
          msg.reply(`사용자에게 메세지를 못보냈습니다.\n사유: ${err.message}`)
        )
      await mentionMember!.kick(reason)
    } catch (err) {
      return msg.channel.send('이 사용자가 킥이 안되고 있어요...')
    }
  }
}
