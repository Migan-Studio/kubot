import { SlashCommand } from 'discommand-slash'
import {
  CommandInteraction,
  Formatters,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} from 'discord.js'
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
k!, ㅏ!, K!

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
- 청소 [clear]
- 슬로우모드 [slowmode]
- 언밴 [차단해제, unban]`
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
      components: [
        new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setLabel('봇초대')
              .setStyle('LINK')
              .setURL(
                'https://discord.com/api/oauth2/authorize?client_id=704999866094452816&permissions=8&scope=bot%20applications.commands'
              )
              .setEmoji('🔗')
          )
          .addComponents(
            new MessageButton()
              .setLabel('봇 소스코드')
              .setStyle('LINK')
              .setURL('https://github.com/Migan178/kubot')
              .setEmoji('🔗')
          )
          .addComponents(
            new MessageButton()
              .setLabel('봇 서포트 서버')
              .setStyle('LINK')
              .setURL('https://discord.gg/mJ8kPgMUpD')
              .setEmoji('🔗')
          ),
      ],
    })
  }
}
