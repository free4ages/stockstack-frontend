export default function debounce<T extends Function>(fn:any, time:number) {
  let timeoutId:any;
  function wrapper (...args:any) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
  return <T>(<any>wrapper);
}

