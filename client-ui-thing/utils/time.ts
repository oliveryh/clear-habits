const secondsToTimestamp = (val: number, { zeroPad = false, includeSeconds = false } = {}) => {
  console.log(val)
  const _zeroPad = (value: number, num?: number) => {
    num = typeof num !== "undefined" ? num : 2
    return value.toString().padStart(num, "0")
  }

  var tt = val
  var hours = zeroPad ? _zeroPad(Math.floor(tt / 3600)) : Math.floor(tt / 3600)
  var minutes = _zeroPad(Math.floor((tt % 3600) / 60))
  if (includeSeconds) {
    var seconds = _zeroPad(Math.floor(tt % 60))
    return `${hours}:${minutes}:${seconds}`
  } else {
    return `${hours}:${minutes}`
  }
}

export { secondsToTimestamp }
