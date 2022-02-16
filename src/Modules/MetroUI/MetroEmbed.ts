import {
  ColorResolvable,
  EmbedAuthorData,
  Formatters,
  MessageEmbed,
} from 'discord.js'

const Embed = new MessageEmbed()

export function MetroUIEmbed({
  title,
  description,
  author,
  color,
}: {
  title: string
  description: string
  author: EmbedAuthorData
  color: ColorResolvable
}) {
  Embed.setTitle(title)
  Embed.setAuthor({ name: author.name, iconURL: author.iconURL })
  Embed.setDescription(Formatters.codeBlock('md', description))
  Embed.setColor(color)
  Embed.setTimestamp(Date.now())
  return Embed
}
