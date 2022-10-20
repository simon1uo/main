import Mock from 'mockjs'
const { Random } = Mock

const jsErrorData = Mock.mock({
  runtime: {
    amount: () => Random.integer(10, 100),
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  resource: {
    amount: () => Random.integer(10, 100),
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  promise: {
    amount: () => Random.integer(10, 100),
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
})

const performanceData = Mock.mock({
  ttfb: () => Random.integer(10, 2000),
  dom: () => Random.integer(10, 2000),
  load: () => Random.integer(10, 200),
})

export default [
  {
    url: '/api/monitor/jserror',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          ...jsErrorData,
        },
      }
    },
  },
  {
    url: '/api/monitor/performance',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          ...performanceData,
        },
      }
    },
  },
]
