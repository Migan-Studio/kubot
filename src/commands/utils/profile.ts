import { Command, Argument } from 'discord-akairo'
import { Message, MessageEmbed, Formatters, Presence } from 'discord.js'

export default class ProfileCommand extends Command {
  // name = '프로필'
  // aliases = ['profile']
  constructor() {
    super('profile', {
      aliases: ['profile', '프로필'],
      args: [
        {
          id: 'member',
          type: Argument.union('Member', 'String'),
          prompt: {
            optional: true,
          },
        },
      ],
    })
  }
  exec(msg: Message, { member }: { member: string }) {
    function a(a: any) {
      if (a === null || a === undefined) {
        return '없음'
      } else {
        return a
      }
    }
    let user =
      msg.mentions.members!.first() ||
      msg.guild!.members.cache.get(member) ||
      msg.member
    msg.reply({
      embeds: [
        new MessageEmbed()
          .setColor(0x459ff7)
          .setTitle(`${user?.user.username}님의 정보`)
          .setThumbnail(
            user?.user.displayAvatarURL({ dynamic: true, size: 512 }) as string
          )
          .setDescription(
            Formatters.codeBlock(
              'markdown',
              `# 유저 이름
${user?.user.username}

# 유저 태그
${user?.user.discriminator}

# 상태
${a(user?.presence?.status!)}

# 봇여부
${user?.user.bot}

# 닉네임
${a(user?.nickname!)}

# 계정 생성일
${user?.user.createdAt.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}

# 서버 가입일
${user?.joinedAt?.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}`
            )
          )
          .setTimestamp(Date.now())
          .setFooter(
            msg.author.tag,
            msg.author.displayAvatarURL({ dynamic: true, size: 512 })
          ),
      ],
    })
  }
}
