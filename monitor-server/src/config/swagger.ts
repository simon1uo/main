const Router = require('koa-router')
const path = require('path')
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerRouter = new Router({
  prefix: '/swagger'
})

const swaggerDefinition = {
  info: {
    title: '前端监控平台 API 文档',
    version: '1.0.0',
    description: 'API 文档'
  }
}

const swaggerOptions = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../routes/doc/*.ts')]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

swaggerRouter.get(
  '/swagger.json',
  async function (ctx: {
    set: (arg0: string, arg1: string) => void
    body: any
  }) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = swaggerSpec
  }
)

export default swaggerRouter
