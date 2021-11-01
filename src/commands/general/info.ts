import { MessageCommand } from 'discommand'
import { Message, MessageEmbed, Formatters } from 'discord.js'
import { ButtonPaginator } from 'djs-interaction-util'
import os from 'os'
import modules from '../../../package.json'

export = class extends MessageCommand {
  name = '정보'
  aliases = ['info', 'Info']
  execute(msg: Message, args: string[]) {
    const Embed = new MessageEmbed()
      .setTitle('모듈정보')
      .setTimestamp(Date.now())
      .setFooter(msg.author.tag, msg.author.displayAvatarURL())
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
${msg.client.guilds.cache.size}
  
# 유저수
${msg.client.users.cache.size}
  
# 프로세스 pid
${process.pid}`
                )
              )
              .setTimestamp(Date.now())
              .setFooter(msg.author.tag, msg.author.displayAvatarURL()),
          ],
        },
      ],
    })

    paginator.addPage({
      content: null,
      embeds: [Embed],
    })
    paginator.run(msg)
  }
}
