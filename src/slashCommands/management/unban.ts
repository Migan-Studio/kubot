import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, Permissions } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  //@ts-ignore
  data = new SlashCommandBuilder()
    .setName('unban')
    .setDescription('해당 유저를 차단해제합니다')
    .addStringOption(options => {
      return options
        .setName('id')
        .setDescription('차단해제할 유저의 아이디')
        .setRequired(true)
    })
  execute(interaction: CommandInteraction) {
    if (isNaN(interaction.options.getString('id') as unknown as number))
      return interaction.reply('')
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
    interaction
      .guild!.members.unban(interaction.options.getString('id')!)
      .catch((error: Error) => {
        console.log(error)
      })
    return interaction.reply({
      content: '해당 해당유저를 차단해제했어요',
      ephemeral: true,
    })
  }
}
