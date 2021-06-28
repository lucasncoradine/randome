import { Database, minifyRecords, Tables } from "./utils/Airtable"
import { NextApiResponse, NextApiRequest } from "next"
import ResponseCodes from "./utils/responseCodes.json"

const table = Database.connectTo(Tables.Lists)

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { googleID } = req.query

    const records = await table
      .select({
        filterByFormula: `{googleID} = "${googleID}"`,
      })
      .all()

    res.status(ResponseCodes.OK).json(minifyRecords(records))
  } catch (error) {
    res.status(ResponseCodes.InternalServerError).json(error)
  }
}
