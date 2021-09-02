import React, { useContext } from "react"
import { v4 } from "uuid"

export class AppUtils {
  static ValidateContext<T>(reactContext: React.Context<T>) {
    const context = useContext(reactContext)

    if (context == null) {
      throw new Error("useContext must be used within a Provider")
    }

    return context
  }

  static listFromNotion = (list: string) => {
    return list
      .split("\n")
      .map((x) => x.replace("- ", ""))
      .join(";")
  }

  static generateUUID = () => {
    return v4()
  }

  static csvToStringArray = async (files: File[], separator?: string) => {
    let result: string[] = []

    if (files.length > 0) {
      await Promise.all(
        files.map(async (file) => {
          const text = await file.text()
          const items = text.split(separator || ";")

          result = [...result, ...items]
        })
      )
    }

    return result
  }
}
