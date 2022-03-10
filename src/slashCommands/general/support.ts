/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, Formatters, Team, User } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // @ts-ignore
  data = new SlashCommandBuilder()
    .setName('support')
    .setDescription('개발자에게 문의를 전송합니다.')
    .addStringOption(option => {
      return option
        .setName('content')
        .setDescription('문의 내용')
        .setRequired(true)
    })
  execute(interaction: CommandInteraction) {
    const content = interaction.options.getString('content')
    let user
    if (interaction.client.application?.owner instanceof User) {
      user = interaction.client.application?.owner?.id
      interaction.client.users.fetch(user as string).then(user =>
        user.send(
          `새문의가 왔어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
            Math.floor(interaction.createdTimestamp / 1000)
          )} (${Formatters.time(
            Math.floor(interaction.createdTimestamp / 1000),
            'R'
          )})
문의 작성자: ${interaction.user.tag} (${interaction.user.id})`
        )
      )
      interaction.reply({
        content: `문의를 성공적으로 보냈어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
          Math.floor(interaction.createdTimestamp / 1000)
        )}`,
        ephemeral: true,
      })
    } else if (interaction.client.application?.owner instanceof Team) {
      user = interaction.client.application?.owner?.ownerId
      interaction.client.users.fetch(user as string).then(user =>
        user.send(
          `새문의가 왔어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
            Math.floor(interaction.createdTimestamp / 1000)
          )} (${Formatters.time(
            Math.floor(interaction.createdTimestamp / 1000),
            'R'
          )})
문의 작성자: ${interaction.user.tag} (${interaction.user.id})`
        )
      )
      interaction.reply({
        content: `문의를 성공적으로 보냈어요!\n문의 내용: ${content}\n문의 작성시간: ${Formatters.time(
          Math.floor(interaction.createdTimestamp / 1000)
        )} (${Formatters.time(
          Math.floor(interaction.createdTimestamp / 1000),
          'R'
        )})`,
        ephemeral: true,
      })
    }
  }
}
