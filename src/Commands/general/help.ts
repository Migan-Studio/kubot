import { Command } from 'discommand'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import MetroUI from '../../Modules/MetroUI'

export = class extends Command {
  data = new SlashCommandBuilder()
    .setName('도움말')
    .setDescription('이봇의 도움말을 보여줍니다.')
  execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new MetroUI().MetroEmbed({
          title: `${interaction.client.user?.username}`,
          author: {
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          },
          color: 0x000000,
          description: `# 도움말
버전: ${interaction.client.version}`,
        }),
      ],
    })
  }
}
