import { NextApiRequest, NextApiResponse } from "next"
import { List } from "../../models/List.model"
import { Database, minifyRecords, Tables } from "./utils/Airtable"
import ResponseCodes from "./utils/responseCodes.json"

const table = Database.connectTo(Tables.Lists)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const lists = req.body as List[]
    const listFields = lists.map((list) => {
      return {
        fields: {
          name: list.fields.name,
          googleID: list.fields.googleID,
          items: list.fields.items,
        },
      }
    })

    const itensToCreate: any[] = []

    await Promise.all(
      listFields.map(async (list) => {
        const existingItem = (
          await table
            .select({
              filterByFormula: `AND({googleID} = "${list.fields.googleID}", {name} = "${list.fields.name}")`,
            })
            .firstPage()
        )[0]

        if (existingItem) {
          let items = (existingItem.fields.items as string).split(";")
          items = [...items, ...list.fields.items.split(";")]

          const fields = {
            name: existingItem.fields.name,
            googleID: existingItem.fields.googleID,
            items: items.join(";"),
          }

          await existingItem.updateFields(fields)
        } else {
          itensToCreate.push(list)
        }
      })
    )

    if (itensToCreate.length > 0) {
      const createdLists = await table.create([...itensToCreate])

      res.status(ResponseCodes.OK).json(minifyRecords(createdLists))
    } else {
      res.status(ResponseCodes.OK).json("All items have been synced.")
    }
  } catch (error) {
    res.status(ResponseCodes.InternalServerError).json(error)
  }
}
