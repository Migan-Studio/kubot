import { SlashCommand } from 'discommand-slash'
import { CommandInteraction, Formatters, MessageEmbed } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'
import { ButtonPaginator } from 'djs-interaction-util'
import os from 'os'
import modules from '../../../package.json'

export = class extends SlashCommand {
  data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('이 봇의 정보를 반환합니다.')
  execute(interaction: CommandInteraction) {
    const Embed = new MessageEmbed()
      .setTitle('모듈정보')
      .setTimestamp(Date.now())
      .setFooter(interaction.user.tag, interaction.user.displayAvatarURL())
    for (let module of Object.entries(modules.dependencies)) {
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
k!

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
              .setFooter(
                interaction.user.tag,
                interaction.user.displayAvatarURL()
              ),
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
