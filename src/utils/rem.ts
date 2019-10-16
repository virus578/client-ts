
export const SetRem = (pwidth: number, prem: number) => {
  let html = document.getElementsByTagName('html')[0]
  const oWidth = (document.body.clientWidth || document.documentElement.clientWidth) >= 1920 ? 1920 : document.body.clientWidth || document.documentElement.clientWidth
  console.log(oWidth)
  html.style.fontSize = (oWidth / pwidth) * prem + 'px'
}

export const proportion = (p: string) => {
  console.log(document.body.clientHeight)
  if (p === 'h') {
    return document.body.clientHeight / 937
  } else {
    return document.body.clientWidth / 1920
  }
}
