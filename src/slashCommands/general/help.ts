import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, Formatters, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('이봇의 도움말입니다.')
  execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor(0x459ff7)
          .setTitle('도움말')
          .setDescription(
            Formatters.codeBlock(
              'markdown',
              `# 접두사
k!

# 일반
- 도움말 [help]
- 문의 [support]
- 정보 [info, Info]

# 유틸리티
- 핑 [ping]
- 프로필 [profile]

# 관리
- 킥 [추방, kick]
- 밴 [차단, ban]
- 청소 [clear]`
            )
          )
          .setThumbnail(
            interaction.user.displayAvatarURL({ dynamic: true, size: 512 })
          )
          .setTimestamp(Date.now())
          .setFooter(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true, size: 512 })
          ),
      ],
    })
  }
}
