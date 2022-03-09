import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, MessageEmbed, Formatters } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('이봇의 핑을 반환합니다.')
  execute(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
      .setColor(0x459ff7)
      .setTitle('퐁!')
      .setTimestamp(Date.now())
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
    interaction.reply({
      embeds: [
        embed.setDescription(
          Formatters.codeBlock(
            'markdown',
            `# 웹소켓 핑
${interaction.client.ws.ping}`
          )
        ),
      ],
    })
  }
}
