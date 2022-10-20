import { Context } from 'koa'
import { getManager } from 'typeorm'
import User from '../../entity/user'
import { ApiResponse } from '../../utils/response'

export default async (ctx: Context) => {
  const cookie = ctx.request.body.cookie
  const userRepository = getManager().getRepository(User)
  // @ts-ignore
  const user = await userRepository.findOne({ session: cookie })
  if (user) {
    user.session = '' // 推出登陆删除数据库中的session
    await userRepository.save(user)
    ctx.body = new ApiResponse({
      code: 200,
      msg: '已退出登录',
      data: {
        status: true
      }
    })
  }
}
