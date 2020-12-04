import ICacheProvider from '../models/ICacheProvider'

interface ICacheData {
  [key: string]: string
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {}

  public async save(key: string, value: string): Promise<void> {
    const parsedValue = JSON.stringify(value)

    this.cache[key] = parsedValue
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key]

    if (!data) {
      return null
    }

    const parsedData: T = JSON.parse(data)

    return parsedData
  }

  public async invalidate(key: string): Promise<void> {
    delete this.cache[key]
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.cache).filter(key =>
      key.startsWith(`${prefix}:`)
    )

    keys.forEach(key => {
      delete this.cache[key]
    })
  }
}