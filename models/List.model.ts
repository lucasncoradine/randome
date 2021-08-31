export interface List {
  id: string
  fields: {
    name: string
    googleID: string
    items: string
  }
}

export class ListModel {
  list: List = { fields: {} } as List

  constructor(id: string, name: string, items: string[]) {
    this.list.id = id
    this.list.fields.name = name
    this.list.fields.googleID = ""
    this.list.fields.items = items.join(";")
  }
}
