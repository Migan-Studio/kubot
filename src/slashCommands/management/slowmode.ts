import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, GuildMember, TextChannel } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  //@ts-ignore
  data = new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('해당채널의 슬로우 모드를 겁니다')
    .addNumberOption(options => {
      return options
        .setName('second')
        .setDescription('슬로우 모드의 초')
        .setRequired(true)
    })
  execute(interaction: CommandInteraction) {
    const channel = interaction.guild?.channels.cache.get(
      interaction.channelId
    ) as TextChannel
    const member = interaction.member as GuildMember
    if (!interaction.guild)
      return interaction.reply({
        content: '이 명령어는 서버내에서만 사용할 수 있어요',
        ephemeral: true,
      })
    if (!member!.permissions.has('MANAGE_CHANNELS'))
      return interaction.reply({
        content: `어라..? 일단 ${interaction.user.username}님에게 채널 관리하기 권한이 없으시네요`,
        ephemeral: true,
      })
    if (!interaction.guild.me?.permissions.has('MANAGE_CHANNELS'))
      return interaction.reply({
        content: `어라..? 일단 이봇에게 채널 관리하기 권한이 없어요`,
        ephemeral: true,
      })

    channel.setRateLimitPerUser(interaction.options!.getNumber('second')!)
    interaction.reply({
      content: `슬로우 모드를 ${interaction.options.getNumber(
        'second'
      )}초로 설정했어요`,
      ephemeral: true,
    })
  }
}
