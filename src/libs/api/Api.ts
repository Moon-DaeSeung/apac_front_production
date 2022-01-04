/* eslint-disable no-undef */
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from 'axios'

class API {
  private axios: AxiosInstance
  constructor (url: string) {
    this.axios = axios.create({ baseURL: url })
    this.use(this.setAuthorization)
  }

  protected async request<T> (method: Method, url: string, configProps: AxiosRequestConfig) {
    const config: AxiosRequestConfig = {
      ...this.axios.defaults,
      ...configProps,
      url: url,
      method: method
    }
    let result = null
    try {
      result = await this.axios.request<Response<T>>(config)
    } catch (error) {
      throw new HttpError(error as AxiosError<any>)
    }
    const { data: { code, data, message } } = result
    if (code !== 0 && code !== 200) {
      throw new ServerError(code, data, message)
    }
    return data
  }

  private tokenResolver: (() => string) | null = null

  public setTokenResolver (tokenResolver: (() => string) | null) {
    this.tokenResolver = tokenResolver
  }

  public get<T> (url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('get', url, config)
  }

  public post<T> (url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('post', url, { ...config, data })
  }

  public patch<T> (url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('patch', url, { ...config, data })
  }

  public put<T> (url: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('put', url, { ...config, data })
  }

  public delete<T> (url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('delete', url, config)
  }

  protected setAuthorization (config: AxiosRequestConfig): AxiosRequestConfig {
    const authorization = this.tokenResolver
      ? { Authorization: `Bearer ${this.tokenResolver()}` }
      : {}
    return {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'application/json',
        ...authorization
      }
    }
  }

  protected use (handler: (value: AxiosRequestConfig) => AxiosRequestConfig) {
    this.axios.interceptors.request.use(handler)
  }
}

export class HttpError extends Error {
  status: number
  constructor (error: AxiosError) {
    super(error.message)
    this.status = error.response?.status ?? -1
  }
}

export class ServerError extends Error {
  code: number
  data: any
  constructor (code: number, data: any, message?: string) {
    super(message || '')
    this.code = code
    this.data = data
  }
}

type Response<T> = {
  data: T
  code: number
  message?: string
}

console.log(`current api uri is ${APAC_URL}`)
export const api = new API(APAC_URL)
