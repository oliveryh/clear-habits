const secondsToSummary = (val: number, includeSeconds = false) => {
  var tt = val
  var hours = Math.floor(tt / 3600)
  var minutes = Math.floor((tt % 3600) / 60)
  var seconds = Math.floor(tt % 60)
  let result = ""
  if (hours > 0) {
    result += `${hours}h `
  }
  if (minutes > 0) {
    result += `${minutes}m `
  }
  if (val < 60 || includeSeconds) {
    result += `${seconds}s`
  }
  return result.trim()
}

export { secondsToSummary }
