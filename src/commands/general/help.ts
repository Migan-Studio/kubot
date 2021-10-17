import { MessageCommand } from 'discommand'
import { Message, MessageEmbed, Formatters } from 'discord.js'

export = class extends MessageCommand {
  name = '도움말'
  aliases = ['help', '도움']
  execute(msg: Message, args: string[]) {
    msg.reply({
      embeds: [
        new MessageEmbed()
          .setColor(0x459ff7)
          .setTitle('도움말')
          .setDescription(
            Formatters.codeBlock(
              'markdown',
              `# 접두사
--

# 일반
- 도움말 [help]

# 유틸리티
- 핑 [ping]

# 관리
- 킥 [추방, kick]
- 밴 [차단, ban]`
            )
          )
          .setThumbnail(msg.author.displayAvatarURL())
          .setTimestamp(Date.now())
          .setFooter(
            msg.author.tag,
            msg.author.displayAvatarURL({ dynamic: true, size: 512 })
          ),
      ],
    })
  }
}
