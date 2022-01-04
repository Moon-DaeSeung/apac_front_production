class StorageAPI {
  private storage: Storage
  constructor (storage: Storage) {
    this.storage = storage
  }

  getItem <T> (key: string): T | null {
    const item = this.storage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  setItem <T> (key: string, value: T): void {
    const item = JSON.stringify(value)
    this.storage.setItem(key, item)
  }
}

export default new StorageAPI(localStorage)
