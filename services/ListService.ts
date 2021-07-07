import axios from "axios"
import { List } from "../models/List.model"

export class ListService {
  static getUserLists = async (googleID: string) => {
    const result = await axios.get("/api/getUserLists", {
      params: {
        googleID,
      },
    })

    return result.data as List[]
  }

  static saveList = async (name: string, googleID: string, items: string[]) => {
    const result = await axios.post("/api/createList", {
      name,
      googleID,
      items,
    })

    return result.data
  }
}
