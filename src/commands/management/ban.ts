import { Argument, Command } from 'discord-akairo'
import { Message, Permissions } from 'discord.js'

export default class BanCommand extends Command {
  constructor() {
    super('ban', {
      aliases: ['ban', '밴'],
      args: [
        {
          id: 'Member',
          type: Argument.union('String', 'Member'),
          prompt: {
            start: '차단할 사용자를 지정하셨나요?',
          },
        },
        {
          id: 'reason',
          prompt: {
            optional: true,
          },
        },
      ],
    })
  }
  async exec(
    msg: Message,
    { Member, reason }: { Member?: string; reason?: string }
  ) {
    if (!msg.member?.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
      return msg.reply(
        `어라..? 일단 ${msg.author.username}님에게 멤버 차단하기 권한이 없으시네요`
      )
    if (
      !msg.guild?.members
        ?.fetch(msg.client.user?.id as string)
        .then(member => member.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
    )
      return msg.reply('어라..? 일단 이봇에게 멤버 차단하기 권한이 없어요')
    const mentionMember =
      msg.mentions.members?.first() ||
      msg.guild?.members.cache.get(Member as string)
    if (!reason) reason = ' 없음'

    if (!mentionMember?.bannable)
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
      await mentionMember?.ban({ reason })
    } catch (err) {
      return msg.channel.send('이 사용자가 차단이 안되고 있어요...')
    }
  }
}
