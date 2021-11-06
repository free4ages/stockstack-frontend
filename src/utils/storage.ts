const prefix = "ss-";

function getStorage(storage:string) {
  if (!storage || storage === "local") {
      return localStorage;
  } else {
      return sessionStorage;
  }
}

export function storageGet(key:string, storage:string) {
  return getStorage(storage).getItem(prefix + key);
}

export function storageSet(key:string, value:any, storage:string) {
  return getStorage(storage).setItem(prefix + key, value);
}

export function storageRemove(key:string, storage:string) {
  return getStorage(storage).removeItem(prefix + key);
}
