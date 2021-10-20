import { SlashCommand } from 'discommand-slash'
import {
  CommandInteraction,
  Formatters,
  GuildMember,
  MessageEmbed,
} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // @ts-ignore
  data = new SlashCommandBuilder()
    .setName('profile')
    .setDescription('당신이나 지목한 유저의 정보를 반환합니다.')
    .addMentionableOption(option => {
      return option
        .setName('name')
        .setDescription('유저의 이름')
        .setRequired(false)
    })
  execute(interaction: CommandInteraction) {
    function a(a: any) {
      if (a === null || a === undefined) {
        return '없음'
      } else {
        return a
      }
    }
    let user: GuildMember =
      (interaction.options.getMentionable('name') as GuildMember) ||
      interaction.guild?.members.cache.get(interaction.user.id)
    interaction.reply({
      embeds: [
        new MessageEmbed()
          .setColor(0x459ff7)
          .setTitle(`${user?.user.username}님의 정보`)
          .setThumbnail(
            user?.user.displayAvatarURL({ dynamic: true, size: 512 }) as string
          )
          .setDescription(
            Formatters.codeBlock(
              'markdown',
              `# 유저 이름
${user?.user.username}

# 유저 태그
${user?.user.discriminator}

# 상태
${a(user?.presence?.status!)}

# 봇여부
${user?.user.bot}

# 닉네임
${a(user?.nickname!)}

# 계정 생성일
${user?.user.createdAt.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}

# 서버 가입일
${user?.joinedAt?.toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' })}`
            )
          )
          .setTimestamp(Date.now())
          .setFooter(
            interaction.user.tag,
            interaction.user.displayAvatarURL({ dynamic: true, size: 512 })
          ),
      ],
    })
  }
}
