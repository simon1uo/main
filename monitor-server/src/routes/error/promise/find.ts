import { Context } from 'koa'
import find from '../../../middleware/find'

export default async (ctx: Context) => {
  const query = `from(bucket: "promiseError")
    |> range(start: -122h)
    |> filter(fn: (r) => r._measurement == "ddd")
    |> filter(fn: (r) => r._field == "sss")`

  return (ctx.body = find(query))
}
