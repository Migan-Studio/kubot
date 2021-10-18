import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, Permissions } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // @ts-ignore
  data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('선택한 사용자를 밴합니다.')
    .addStringOption(option => {
      return option
        .setName('id')
        .setDescription('유저의 아이디')
        .setRequired(true)
    })
    .addStringOption(option => {
      return option
        .setName('reason')
        .setDescription('차단 사유')
        .setRequired(false)
    })

  async execute(interaction: CommandInteraction) {
    if (
      !interaction.guild?.members.cache
        .get(interaction.user.id)
        ?.permissions.has(Permissions.FLAGS.BAN_MEMBERS)
    )
      return interaction.reply({
        content: `어라..? 일단 ${interaction.user.username}님에게 멤버 밴하기 권한이 없으시네요`,
        ephemeral: true,
      })

    if (!interaction.guild?.me?.permissions.has(Permissions.FLAGS.BAN_MEMBERS))
      return interaction.reply({
        content: '어라..? 일단 이봇에게 멤버 밴하기 권한이 없어요',
        ephemeral: true,
      })
    let kickUser = interaction.guild?.members.cache.get(
      interaction.options.getString('id') as string
    )
    let reason = interaction.options.getString('reason')
    if (!reason) reason = ' 없음'

    if (!kickUser?.bannable)
      return interaction.reply({
        content: '이 사용자는 제가 차단을 못해요...',
        ephemeral: true,
      })

    try {
      await kickUser!.ban({ reason })
      await interaction.reply({
        content: '해당유저를 차단했어요!',
        ephemeral: true,
      })
    } catch (err) {
      return interaction.reply({
        content: '이 사용자가 차단이 안되고 있어요...',
        ephemeral: true,
      })
    }
  }
}
