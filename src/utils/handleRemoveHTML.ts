export function RemoveHTML(text: string){
  return text.replace(/(<([^>]+)>)/ig, `${'\n'}`)
}