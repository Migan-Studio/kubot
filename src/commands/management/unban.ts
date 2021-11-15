import { Command, Argument } from 'discord-akairo'
import { Message, Permissions } from 'discord.js'

export default class UnbanCommand extends Command {
  // name = '차단해제'
  // aliases = ['언밴', 'unban']
  constructor() {
    super('unban', {
      aliases: ['unban', '언밴'],
      args: [
        {
          id: 'member',
          type: Argument.union('String'),
          prompt: {
            start: '차단해제할 유저의 id를 입력해주세요',
          },
        },
      ],
    })
  }
  exec(msg: Message, { member }: { member: string }) {
    // if (!args[0]) return msg.reply('차단해제할 유저의 id를 입력해주세요')
    if (isNaN(member as unknown as number))
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
    msg.guild!.members.unban(member).catch((error: Error) => {
      console.log(error)
    })
    msg.reply('해당 해당유저를 차단해제했어요')
  }
}
