import { Context } from 'koa'
import find from '../../../middleware/find'

export default async (ctx: Context) => {
  const bucket = 'blankScreen'
  const query = `from(bucket: "${bucket}")
  |> range(start: -122h)`

  return (ctx.body = find(query))
}
