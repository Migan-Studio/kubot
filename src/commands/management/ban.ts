import { MessageCommand } from 'discommand'
import { Message, Permissions } from 'discord.js'

export = class extends MessageCommand {
  name = '밴'
  aliases = ['차단', 'ban']
  async execute(msg: Message, args: string[]) {
    if (!msg.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 멤버 차단하기 권한이 없으시네요`
      )
    if (
      !msg.guild?.members
        ?.fetch(msg.client.user!.id)
        .then(member => member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
    )
      return msg.reply('어라..? 일단 이봇에게 멤버 차단하기 권한이 없어요')
    let mentionMember = msg.mentions.members?.first()
    let reason = args.slice(1).join(' ')
    if (!reason) reason = ' 없음'

    if (!args[0]) return msg.reply('차단할 사용자를 지정하셨나요?')
    if (!mentionMember!.bannable)
      return msg.reply('이 사용자는 제가 밴을 못해요...')

    try {
      await mentionMember
        ?.send(
          `${mentionMember?.guild.name}에서 차단이 되셨습니다.     
사유: ${reason}`
        )
        .catch(err =>
          msg.reply(`사용자에게 메세지를 못보냈습니다.\n사유: ${err.message}`)
        )
      await mentionMember!.kick(reason)
    } catch (err) {
      return msg.channel.send('이 사용자가 차단이 안되고 있어요...')
    }
  }
}
