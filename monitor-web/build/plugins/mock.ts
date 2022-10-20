import { viteMockServe } from 'vite-plugin-mock'

export function configMock(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock/api',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock';
      setupProdMockServer();
    `,
  })
}
