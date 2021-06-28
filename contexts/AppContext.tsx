import React, { createContext, useState } from "react"
import { List } from "../models/List.model"
import { AppUtils } from "../utils/utils"

interface AppContextProps {
  selectedList: List | undefined
  setSelectedList(value: List): void
}

const AppContext = createContext({} as AppContextProps)

export const AppProvider: React.FC = ({ children }) => {
  const [selectedList, setSelectedList] = useState<List>()

  return (
    <AppContext.Provider
      value={{
        selectedList,
        setSelectedList,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return AppUtils.ValidateContext<AppContextProps>(AppContext)
}
