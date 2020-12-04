import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@config/cache'
import ICacheProvider from '../models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  public async save(key: string, value: string): Promise<void> {
    const parsedValue = JSON.stringify(value)

    await this.client.set(key, parsedValue)
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData: T = JSON.parse(data)

    return parsedData
  }

  public async invalidate(key: string): Promise<void> {
    throw new Error(`Method not implemented. key: ${key}`)
  }

  public async invalidatePrefix(key: string): Promise<void> {
    const keys = await this.client.keys(`${key}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => pipeline.del(key))

    await pipeline.exec()
  }
}
