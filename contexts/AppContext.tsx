import React, { createContext, useEffect, useState } from "react"
import { Toast, ToastProps, ToastVariant } from "../components/Toast/Toast"
import { List, ListModel } from "../models/List.model"
import { AppUtils } from "../utils/utils"
import { useCookies } from "./CookiesContext"

interface AppContextProps {
  toggleToast(message: string, variant: ToastVariant): void
  addList(model: ListModel): void
  selectList(list: List): void
  clearCookies(): void
  clearSelectedList(): void
  storedLists: List[]
  selectedList: List | null
}

const AppContext = createContext({} as AppContextProps)

export const AppProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<ToastProps>({} as ToastProps)
  const [showToast, setShowToast] = useState(false)
  const [storedLists, setStoredLists] = useState<List[]>([])
  const [selectedList, setSelectedList] = useState<List | null>(null)

  const { getCookie, setCookie } = useCookies()

  const toggleToast = (message: string, variant: ToastVariant) => {
    setToast({ message, variant })
    setShowToast(true)
  }

  const storeCookies = () => {
    setCookie("lists", storedLists)
  }

  const clearCookies = () => {
    setStoredLists([])
  }

  const addList = (model: ListModel) => {
    const lists = [...storedLists]
    lists.push(model.list)

    setStoredLists(lists)
  }

  const selectList = (list: List) => {
    setSelectedList(list)
  }

  const clearSelectedList = () => {
    setSelectedList(null)
  }

  useEffect(() => {
    setStoredLists(getCookie("lists") || [])
  }, [])

  useEffect(() => {
    const toastTimer = setTimeout(() => setShowToast(false), 5000)

    return () => {
      clearTimeout(toastTimer)
    }
  }, [showToast])

  useEffect(() => {
    storeCookies()
  }, [storedLists, selectList])

  return (
    <AppContext.Provider
      value={{
        toggleToast,
        addList,
        selectList,
        clearCookies,
        clearSelectedList,
        storedLists,
        selectedList,
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
