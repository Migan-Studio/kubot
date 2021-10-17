import { MessageCommand } from 'discommand'
import { Message, MessageEmbed, Formatters, Presence } from 'discord.js'

export = class extends MessageCommand {
  name = '프로필'
  aliases = ['profile']
  execute(msg: Message, args: string[]) {
    function a(a: any) {
      if (a === null || a === undefined) {
        return '없음'
      } else {
        return a
      }
    }
    let user =
      msg.mentions.members!.first() ||
      msg.guild!.members.cache.get(args[0]) ||
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
