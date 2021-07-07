import { Database, minifyRecords, Tables } from "./utils/Airtable"
import { NextApiResponse, NextApiRequest } from "next"
import ResponseCodes from "./utils/responseCodes.json"

const table = Database.connectTo(Tables.Lists)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, googleID, items } = req.body
    const stringItens = (items as string[]).join(";")

    const existingItem =
      (
        await table
          .select({
            filterByFormula: `AND({googleID} = "${googleID}", {name} = "${name}")`,
          })
          .firstPage()
      ).length > 0

    if (!existingItem) {
      const createdList = await table.create([
        {
          fields: {
            name,
            googleID,
            items: stringItens,
          },
        },
      ])

      res.status(ResponseCodes.OK).json(minifyRecords(createdList))
    } else {
      res
        .status(ResponseCodes.InternalServerError)
        .json({ message: "An item with the same name already exists" })
    }
  } catch (error) {
    res.status(ResponseCodes.InternalServerError).json(error)
  }
}
