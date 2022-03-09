import { SlashCommand } from 'discommand-slash'
import {
  CommandInteraction,
  Formatters,
  MessageEmbed,
  Team,
  User,
} from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { ButtonPaginator } from 'djs-interaction-util'
import os from 'os'
import modules from '../../../package.json'

export = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('이 봇의 정보를 반환합니다.')
  execute(interaction: CommandInteraction) {
    function getOwnerID() {
      if (interaction.client.application?.owner instanceof Team) {
        return interaction.client.application!.owner!.ownerId!
      } else if (interaction.client.application?.owner instanceof User) {
        return interaction.client.application!.owner!.id!
      }
    }

    const Embed = new MessageEmbed()
      .setTitle('모듈정보')
      .setTimestamp(Date.now())
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
    for (const module of Object.entries(modules.dependencies)) {
      Embed.addField(module[0], '`' + remove(module[1]) + '`', true)
    }
    function remove(string: string) {
      if (string.startsWith('^')) {
        return string.replace('^', '')
      } else return string
    }
    const paginator = new ButtonPaginator({
      pages: [
        {
          content: null,
          embeds: [
            new MessageEmbed()
              .setTitle('시스템/프로세스/봇정보')
              .setDescription(
                Formatters.codeBlock(
                  'markdown',
                  `# 접두사
k!, ㅏ!, K!

# 봇 개발자
${interaction.client.users.cache.get(getOwnerID()!)?.tag}

# Node.js 버전
${process.version}

# OS/아키텍쳐
${os.platform()} ${os.arch()}

# 서버수
${interaction.client.guilds.cache.size}

# 유저수
${interaction.client.users.cache.size}

# 프로세스 pid
${process.pid}`
                )
              )
              .setTimestamp(Date.now())
              .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL(),
              }),
          ],
        },
      ],
    })

    paginator.addPage({
      content: null,
      embeds: [Embed],
    })
    paginator.run(interaction)
  }
}
