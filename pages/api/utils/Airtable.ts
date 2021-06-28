import AirtableApi, { FieldSet, Table } from "airtable"
import { Records } from "airtable/lib/records"
import { List } from "../../../models/List.model"

export enum Tables {
  Lists = "Lists",
  Itens = "ListItens",
}

const _apiKey = process.env.AIRTABLE_API_KEY || ""
const _baseId = process.env.AIRTABLE_BASE_ID || ""
const base = new AirtableApi({ apiKey: _apiKey }).base(_baseId)

export const minifyRecords = (records: Records<FieldSet>) => {
  return records.map(
    (record) =>
      ({
        id: record.id,
        fields: record.fields,
      } as List)
  )
}

export class Database {
  static connectTo = (tableName: string): Table<FieldSet> => base(tableName)
}
