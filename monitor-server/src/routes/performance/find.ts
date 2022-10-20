import { Context } from 'vm'
import find from '../../middleware/find'

export default async (ctx: Context) => {
  const bucket = 'pv'
  const query = `from(bucket: "${bucket}")
  |> range(start: -122h)
  `

  return (ctx.body = find(query))
}
