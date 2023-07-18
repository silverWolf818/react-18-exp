const isSubscribeByName = (name: string, subscribeName: string) => {
  return name.startsWith(subscribeName) || subscribeName.startsWith(name)
}
export default isSubscribeByName
