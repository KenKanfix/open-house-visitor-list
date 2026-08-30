const DB_NAME = 'open-house-visitors'
const DB_VERSION = 1
const STORE = 'visitors'

let dbPromise = null

function openDB() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)
      request.onupgradeneeded = () => {
        const dbase = request.result
        if (!dbase.objectStoreNames.contains(STORE)) {
          const store = dbase.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
          store.createIndex('date', 'date', { unique: false })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }
  return dbPromise
}

function getStore(mode) {
  return openDB().then((db) => db.transaction(STORE, mode).objectStore(STORE))
}

export async function getAllVisitors() {
  return new Promise((resolve, reject) => {
    getStore('readonly').then((store) => {
      const req = store.getAll()
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => reject(req.error)
    })
  })
}

export async function saveVisitor(record) {
  return new Promise((resolve, reject) => {
    const storePromise = getStore('readwrite')
    storePromise.then((store) => {
      const req = store.put(record)
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error)
    })
  })
}

export async function deleteVisitor(id) {
  return new Promise((resolve, reject) => {
    getStore('readwrite').then((store) => {
      const req = store.delete(id)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  })
}
