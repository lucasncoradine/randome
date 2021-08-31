import React, { createContext } from "react"
import { AppUtils } from "../utils/utils"
import Cookies from "universal-cookie"

interface CookiesContextProps {
  setCookie(name: string, value: any): void
  getCookie(name: string): any
  removeCookie(name: string): void
}

const CookiesContext = createContext({} as CookiesContextProps)

export const CookiesProvider: React.FC = ({ children }) => {
  const cookies = new Cookies()

  const setCookie = (name: string, value: any) => {
    cookies.set(name, value)
  }

  const getCookie = (name: string) => {
    return cookies.get(name)
  }

  const removeCookie = (name: string) => {
    cookies.remove(name)
  }

  return (
    <CookiesContext.Provider
      value={{
        setCookie,
        getCookie,
        removeCookie,
      }}
    >
      {children}
    </CookiesContext.Provider>
  )
}

export const useCookies = () => {
  return AppUtils.ValidateContext<CookiesContextProps>(CookiesContext)
}
