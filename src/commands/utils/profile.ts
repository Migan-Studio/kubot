import { Command, Argument } from 'discord-akairo'
import { Message, MessageEmbed, Formatters, GuildMember } from 'discord.js'

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
    function a(a: boolean) {
      if (!a) {
        return '봇이 아니에요'
      } else if (a) {
        return '봇이 맞아요'
      }
    }

    function b(status: GuildMember) {
      if (!status.presence?.status) {
        return '없음'
      } else {
        switch (status.presence?.status) {
          case 'online':
            return '온라인'
          case 'idle':
            return '자리 비움'
          case 'dnd':
            return '다른 용무 중'
          case 'offline':
            return '오프라인'
        }
      }
    }

    function c(c: string) {
      if (c === null || c === undefined) {
        return '없음'
      } else {
        return c
      }
    }
    const user =
      msg.mentions.members?.first() ||
      msg.guild?.members.cache.get(member) ||
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
${b(user as GuildMember)}

# 봇여부
${a(user?.user.bot as boolean)}

# 닉네임
${c(user?.nickname as string)}

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
