import { Command } from 'discommand'
import { CommandInteraction } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import MetroUI from '../../Modules/MetroUI'

export = class extends Command {
  data = new SlashCommandBuilder().setName('핑').setDescription('이봇의 핑')
  execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new MetroUI().MetroEmbed({
          title: `${interaction.client.user?.username}`,
          description: `# 핑
${interaction.client.ws.ping}ms`,
          color: 0x000000,
          author: {
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL(),
          },
        }),
      ],
    })
  }
}
