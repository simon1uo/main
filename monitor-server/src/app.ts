// 引入koa
import http from 'http'
import path from 'path'
import Koa from 'koa'
import cors from 'koa2-cors'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import influx from 'influx'
import { koaSwagger } from 'koa2-swagger-ui'
import swaggerRouter from './config/swagger'

import { createConnections } from 'typeorm'
import router from './router'

createConnections()
  .then(async () => {
    const app = new Koa()

    // 处理跨域
    const corsOptions = {
      origin: 'http://localhost:5014',
      credentials: true,
      optionSuccessStatus: 200
    }
    app.use(cors(corsOptions))

    // 处理 Navigator.sendBeacon 传参
    app.use(async function (ctx, next) {
      //判断请求的路由路径
      if (/^.*\/beacon\/.+$/.test(ctx.path)) {
        ctx.disableBodyParser = true
      }
      await next()
    })
    // 处理 post 请求的参数
    app.use(bodyParser())

    // swagger 文档
    app.use(swaggerRouter.routes()).use(swaggerRouter.allowedMethods())
    const swaggerOption = {
      routePrefix: '/swagger', // host at /swagger instead of default /docs
      swaggerOptions: {
        url: '/swagger/swagger.json'
      }
    }
    app.use(koaSwagger(swaggerOption))

    // 配置组装好的路由
    app.use(router.routes())

    app.listen(8000, () => {
      console.log('server running at http://localhost:8000')
      console.log('swagger document at http://localhost:8000/swagger')
    })
  })
  .catch((error: any) => console.error('连接有误', error))
