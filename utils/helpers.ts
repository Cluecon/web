export const truncateString = function (fullStr: string, strLen: number) {
  if (fullStr.length <= strLen) return fullStr

  const separator = '...'

  const sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2)

  return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars)
}
