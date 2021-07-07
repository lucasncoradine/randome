export class ArrayUtils {
  static getField(obj: any, field: string) {
    field = field.replace(/\[(\w+)\]/g, ".$1") // convert indexes to properties
    field = field.replace(/^\./, "") // strip a leading dot
    const a = field.split(".")
    for (let i = 0, n = a.length; i < n; ++i) {
      const k = a[i]
      if (k in obj) {
        obj = obj[k]
      } else {
        return
      }
    }
    return obj
  }

  static sortBy(field: string, array: any[]) {
    return array.sort((a, b) => {
      const fieldA = this.getField(a, field)
      const fieldB = this.getField(b, field)

      if (fieldA < fieldB) return -1
      if (fieldA > fieldB) return 1

      return 0
    })
  }

  static getRandom(array: any[]) {
    if (array && array.length) {
      return array[Math.floor(Math.random() * array.length)]
    }
  }
}
