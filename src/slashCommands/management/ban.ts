import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, GuildMember, Permissions } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data = new SlashCommandBuilder()
    .setName('ban')
    .setDescription('선택한 사용자를 밴합니다.')
    .addMentionableOption(option => {
      return option
        .setName('name')
        .setDescription('유저의 이름')
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
    const kickUser = interaction.options.getMentionable('name') as GuildMember
    let reason = interaction.options.getString('reason')
    if (!reason) reason = ' 없음'

    if (!kickUser?.bannable)
      return interaction.reply({
        content: '이 사용자는 제가 차단을 못해요...',
        ephemeral: true,
      })

    try {
      await kickUser
        ?.send(
          `${kickUser?.guild.name}에서 차단이 되셨습니다.     
사유: ${reason}`
        )
        .catch(err =>
          interaction.reply({
            content: `사용자에게 메세지를 못보냈습니다.\n사유: ${err.message}`,
            ephemeral: true,
          })
        )
      await kickUser?.ban({ reason })
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
