import Mock from 'mockjs'
const { Random } = Mock

const FlowData = Mock.mock({
  PV: () => Random.integer(10, 6000),
  UV: () => Random.integer(10, 6000),
  newVistor: () => Random.integer(10, 400),
  ipTotal: () => Random.integer(10, 6000),
  FPP: () => Random.integer(0, 10),
  jumpOutRate: () => Random.integer(10, 20),
})

const FlowDataTrendency = Mock.mock({
  PV: {
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  UV: {
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  newVistor: {
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  ipTotal: {
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  FPP: {
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
  jumpOutRate: {
    type: () => Random.pick(['up', 'down']),
    rate: () => Random.float(5, 30, 2, 2),
  },
})

export default [
  {
    url: '/api/preview/flow',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          ...FlowData,
        },
      }
    },
  },
  {
    url: '/api/preview/trendency',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          ...FlowDataTrendency,
        },
      }
    },
  },
]
