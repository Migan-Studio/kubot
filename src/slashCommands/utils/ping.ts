import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('이봇의 핑을 반환합니다.')
  execute(interaction: CommandInteraction) {
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor(0x459ff7)
          .setTitle('퐁!')
          .addFields({
            name: '핑',
            value: `\`${interaction.client.ws.ping}ms\``,
            inline: true,
          })
          .setTimestamp(Date.now())
          .setFooter(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true, size: 512 })
          ),
      ],
    })
  }
}
