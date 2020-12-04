export default interface ICacheProvider {
  save(key: string, value: unknown): Promise<void>

  recover<T>(key: string): Promise<T | null>

  invalidate(key: string): Promise<void>

  invalidatePrefix(key: string): Promise<void>
}
