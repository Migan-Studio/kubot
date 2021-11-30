import { SlashCommand } from 'discommand-slash'
import {
  CommandInteraction,
  Formatters,
  GuildMember,
  MessageEmbed,
} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

export = class extends SlashCommand {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    function a(a: boolean) {
      if (!a) {
        return '봇이 아니에요'
      } else if (a) {
        return '봇이 맞아요'
      }
    }

    function b(status: GuildMember) {
      if (!status.presence?.status) {
        return '없음'
      } else {
        switch (status.presence?.status) {
          case 'online':
            return '온라인'
          case 'idle':
            return '자리 비움'
          case 'dnd':
            return '다른 용무 중'
          case 'offline':
            return '오프라인'
        }
      }
    }

    function c(c: string) {
      if (c === null || c === undefined) {
        return '없음'
      } else {
        return c
      }
    }
    const user: GuildMember =
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
${b(user as GuildMember)}

# 봇여부
${a(user?.user.bot)}

# 닉네임
${c(user?.nickname as string)}

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
