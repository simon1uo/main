import { Context } from 'koa'
import add from '../../middleware/add'

export default async (ctx: Context) => {
  const bucket = 'pv'

  ctx.body = add({ bucket, request: ctx.req })
}
