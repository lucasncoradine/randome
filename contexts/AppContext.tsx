import React, { createContext, useEffect, useState } from "react"
import { Toast, ToastProps, ToastVariant } from "../components/Toast/Toast"
import { List } from "../models/List.model"
import { AppUtils } from "../utils/utils"

interface AppContextProps {
  selectedList: List | undefined
  setSelectedList(value: List): void
  toggleToast(message: string, variant: ToastVariant): void
}

const AppContext = createContext({} as AppContextProps)

export const AppProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<ToastProps>({} as ToastProps)
  const [showToast, setShowToast] = useState(false)

  const [selectedList, setSelectedList] = useState<List>()

  const toggleToast = (message: string, variant: ToastVariant) => {
    setToast({ message, variant })
    setShowToast(true)
  }

  useEffect(() => {
    const toastTimer = setTimeout(() => setShowToast(false), 5000)

    return () => {
      clearTimeout(toastTimer)
    }
  }, [showToast])

  return (
    <AppContext.Provider
      value={{
        selectedList,
        setSelectedList,
        toggleToast,
      }}
    >
      {children}

      <Toast variant={toast.variant} message={toast.message} show={showToast} />
    </AppContext.Provider>
  )
}

export const useApp = () => {
  return AppUtils.ValidateContext<AppContextProps>(AppContext)
}
