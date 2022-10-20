import Router from 'koa-router'
import login from '../routes/user/login'
import register from '../routes/user/register'
import sendCaptcha from '../routes/user/sendCaptcha'

import addJs from '../routes/error/js/add'
import findJs from '../routes/error/js/find'
import addPromise from '../routes/error/promise/add'
import findPromise from '../routes/error/promise/find'
import addResource from '../routes/error/resource/add'
import findResource from '../routes/error/resource/find'
// cors 异常
import addCors from '../routes/error/cors/add'
import findCors from '../routes/error/cors/find'
// console..error 异常
import addConsoleError from '../routes/error/consoleError/add'
import findConsoleError from '../routes/error/consoleError/find'
// interface 异常
import addInterfaceError from '../routes/error/interface/add'
// blankScreen 异常
import addBlankScreen from '../routes/error/blankScreen/add'
// history 路由
import addHistory from '../routes/behaviour/history/add'
// hash 路由
import addHash from '../routes/behaviour/hash/add'
// pv
import addPv from '../routes/performance/add'

const router = new Router()

// 用户相关
router.post('/api/send-captcha', sendCaptcha)
router.post('/api/login', login)
router.post('/api/register', register)

// Error 异常
router.post('/report/js', addJs)
router.get('/api/js', findJs)

// promise 异常
router.post('/report/promise', addPromise)
router.get('/api/promise', findPromise)

// resource 异常
router.post('/report/resource', addResource)
router.get('/api/resource', findResource)

// cors 异常
router.post('/report/cors', addCors)
router.get('/api/cors', findCors)

// console.error 异常
router.post('/report/console-error', addConsoleError)
router.get('/api/console-error', findConsoleError)

// interface 异常
router.post('/report/interface', addInterfaceError)

// 白屏异常
router.post('/report/blankScreen', addBlankScreen)

// hash 路由
router.post('/report/hash', addHash)

// history 路由
router.post('/report/history', addHistory)

// pv
router.post('/report/pv', addPv)

export default router
