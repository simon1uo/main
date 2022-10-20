import { ClientOptions, InfluxDB } from '@influxdata/influxdb-client'

export const INFLUX_URL: string | ClientOptions = 'http://localhost:8086'
export const INFLUX_TOKEN: string =
  '5AM2djrQtKLcSB2HQtd4uB6edw3CvuFrhYxysTA9D36aw5T-ghTdEtuZ-yC02uH8IFzW9TU_yAZHLMdE0XZXLQ=='
export const INFLUX_ORG: string = 'workspace'

export const clientDB = new InfluxDB({
  url: INFLUX_URL,
  token: INFLUX_TOKEN
})

export const queryApi = clientDB.getQueryApi(INFLUX_ORG)
