import { MessageCommand } from 'discommand'
import { Message, Permissions } from 'discord.js'

export = class extends MessageCommand {
  name = '차단해제'
  aliases = ['언밴', 'unban']
  execute(msg: Message, args: string[]) {
    if (!args[0]) return msg.reply('차단해제할 유저의 id를 입력해주세요')
    if (isNaN(args[0] as unknown as number))
      return msg.reply('차단해제할 멤버를 id로 해야해요')
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
    msg.guild!.members.unban(args[0]).catch((error: Error) => {
      console.log(error)
    })
    msg.reply('해당 해당유저를 차단해제했어요')
  }
}
