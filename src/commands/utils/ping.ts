import { MessageCommand } from 'discommand'
import { Message, MessageEmbed } from 'discord.js'

export = class extends MessageCommand {
  name = '핑'
  aliases = ['ping']
  execute(msg: Message, args: string[]) {
    msg.reply({
      embeds: [
        new MessageEmbed()
          .setColor(0x459ff7)
          .setTitle('퐁!')
          .addFields({
            name: '핑',
            value: `\`${msg.client.ws.ping}ms\``,
            inline: true,
          })
          .setTimestamp(Date.now())
          .setFooter(
            msg.author.tag,
            msg.author.displayAvatarURL({ dynamic: true, size: 512 })
          ),
      ],
    })
  }
}
