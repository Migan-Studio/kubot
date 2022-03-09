import { SlashCommand } from 'discommand-slash'
import {
  CommandInteraction,
  MessageEmbed,
  TextChannel,
  User,
  Team,
} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
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
    function getOwnerID() {
      if (interaction.client.application?.owner instanceof Team) {
        return interaction.client.application!.owner!.ownerId!
      } else if (interaction.client.application?.owner instanceof User) {
        return interaction.client.application!.owner!.id!
      }
    }
    if (interaction.user.id !== getOwnerID())
      return interaction.reply({
        content: '이 명령어는 봇 개발자 전용이에요',
        ephemeral: true,
      })
    interaction.client.channels.cache.forEach(channel => {
      const textChannel = channel as TextChannel
      if (textChannel.type !== 'GUILD_TEXT') return
      if (
        textChannel.topic?.includes(
          `${interaction.client.user?.username.toLowerCase()}-공지`
        )
      ) {
        textChannel.send({
          embeds: [
            new MessageEmbed()
              .setTitle('공지')
              .setDescription(
                interaction.options.getString('content') as string
              )
              .setColor(0x459ff7)
              .setTimestamp(Date.now())
              .setAuthor({
                name: `공지 작성자: ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL(),
              }),
          ],
        })
      } else if (
        !textChannel.topic?.includes(
          `${interaction.client.user?.username.toLowerCase()}-공지`
        )
      )
        return
    })
    interaction.reply({
      content: `성공적으로 ${interaction.options.getString(
        'content'
      )}를 발송했어요!`,
      ephemeral: true,
    })
  }
}
