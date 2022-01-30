import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, MessageEmbed, Formatters } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('이봇의 핑을 반환합니다.')
  async execute(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
      .setColor(0x459ff7)
      .setTitle('퐁!')
      .setTimestamp(Date.now())
      .setFooter(
        interaction.user.tag,
        interaction.user.displayAvatarURL({ dynamic: true, size: 512 })
      )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tempInteraction: CommandInteraction = await interaction.reply({
      embeds: [
        embed.setDescription(
          Formatters.codeBlock(
            'markdown',
            `# 인터렉션 핑
측정중...
    
# 웹소켓 핑
측정중...`
          )
        ),
      ],
    })
    await interaction.editReply({
      embeds: [
        embed.setDescription(
          Formatters.codeBlock(
            'markdown',
            `# 인터렉션 핑
${tempInteraction.createdTimestamp - interaction.createdTimestamp}

# 웹소켓 핑
${interaction.client.ws.ping}`
          )
        ),
      ],
    })
  }
}
