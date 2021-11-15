import { Command } from 'discord-akairo'
import { Formatters, Message, MessageEmbed } from 'discord.js'

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: ['ping', '핑'],
    })
  }
  exec(msg: Message) {
    const embed = new MessageEmbed()
      .setColor(0x459ff7)
      .setTitle('퐁!')
      .setTimestamp(Date.now())
      .setFooter(
        msg.author.tag,
        msg.author.displayAvatarURL({ dynamic: true, size: 512 })
      )
    msg
      .reply({
        embeds: [
          embed.setDescription(
            Formatters.codeBlock(
              'markdown',
              `# 메세지 핑
측정중...
        
# 웹소켓 핑
측정중...`
            )
          ),
        ],
      })
      .then(message =>
        message.edit({
          embeds: [
            embed.setDescription(
              Formatters.codeBlock(
                'markdown',
                `# 메세지 핑
${message.createdTimestamp - msg.createdTimestamp}ms

# 웹소켓 핑
${msg.client.ws.ping}ms`
              )
            ),
          ],
        })
      )
      .catch(console.error)
  }
}
