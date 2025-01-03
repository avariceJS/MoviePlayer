export const formatDate = (val: string) => {
  const d = new Date(val)

  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
}
