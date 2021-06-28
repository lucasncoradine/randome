import React, { useContext } from "react"

export class AppUtils {
  static ValidateContext<T>(reactContext: React.Context<T>) {
    const context = useContext(reactContext)

    if (context == null) {
      throw new Error("useContext must be used within a Provider")
    }

    return context
  }
}
