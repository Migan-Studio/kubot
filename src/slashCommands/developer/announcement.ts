import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, MessageEmbed, TextChannel } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data = new SlashCommandBuilder()
    .setName('announcement')
    .setDescription('개발자 전용')
    .addStringOption(options => {
      return options
        .setName('content')
        .setDescription('공지 내용')
        .setRequired(true)
    })
  execute(interaction: CommandInteraction) {
    if (interaction.user.id !== interaction.client.ownerID)
      return interaction.reply({
        content: '이 명령어는 봇 개발자 전용이에요',
        ephemeral: true,
      })
    interaction.client.channels.cache.forEach(channel => {
      const textChannel = channel as TextChannel
      if (textChannel.type !== 'GUILD_TEXT') return
      if (textChannel.topic?.includes('kubot-공지')) {
        textChannel.send({
          embeds: [
            new MessageEmbed()
              .setTitle('공지')
              .setDescription(
                interaction.options.getString('content') as string
              )
              .setColor(0x459ff7)
              .setTimestamp(Date.now())
              .setFooter(
                `공지 발송자: ${interaction.user.tag}`,
                interaction.user.displayAvatarURL()
              ),
          ],
        })
      } else if (!textChannel.topic?.includes('kubot-공지')) return
    })
    interaction.reply({
      content: `성공적으로 ${interaction.options.getString(
        'content'
      )}를 발송했어요!`,
      ephemeral: true,
    })
  }
}
