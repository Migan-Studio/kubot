/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, Permissions } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // @ts-ignore
  data = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('채팅청소')
    .addNumberOption(options => {
      return options
        .setName('limit')
        .setDescription('청소할 채팅의 갯수')
        .setRequired(true)
    })
  async execute(interaction: CommandInteraction) {
    if (
      !interaction.guild?.members.cache
        .get(interaction.user.id)
        ?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    )
      return interaction.reply({
        content: `어라..? 일단 ${interaction.user.username}님에게 메세지 관리하기 권한이 없으시네요`,
        ephemeral: true,
      })
    if (
      !interaction.guild?.me?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    )
      return interaction.reply({
        content: '어라..? 일단 이봇에게 메세지 관리하기 권한이 없어요',
        ephemeral: true,
      })
    if ((interaction.options.getNumber('limit') as number) > 100)
      return interaction.reply({
        content: '100까지만 가능해요.',
        ephemeral: true,
      })
    if ((interaction.options.getNumber('limit') as number) < 0)
      return interaction.reply({
        content: '0위로 해주셔야 해요',
        ephemeral: true,
      })

    await interaction.channel?.messages
      .fetch({
        limit: interaction.options.getNumber('limit') as number,
      })
      .then(messages => {
        interaction.guild?.channels.fetch(interaction.channelId).then(a => {
          // @ts-ignore
          a.bulkDelete(messages)
          interaction.reply(
            `채팅 ${interaction.options.getNumber('limit')}개를 청소했어요!`
          )
        })
      })
      .catch((err: Error) => {
        interaction.reply({
          content: `예외가 발생했어요!\n에러 메세지: ${err.message}`,
          ephemeral: true,
        })
      })
  }
}
