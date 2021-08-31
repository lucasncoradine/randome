import { useRouter } from "next/router"
import React, { createContext, useEffect, useState } from "react"
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login"
import { List } from "../models/List.model"
import { ListService } from "../services/ListService"
import { ArrayUtils } from "../utils/arrayUtils"
import { AppUtils } from "../utils/utils"
import { useApp } from "./AppContext"

interface User {
  googleId: string
  imageUrl: string
  email: string
  name: string
  givenName: string
  familyName: string
  lists: List[]
}

interface AuthContextProps {
  user: User | undefined
  loading: boolean
  setLoading(value: boolean): void
  googleResponse: GoogleLoginResponse | undefined
  setGoogleResponse(response: GoogleLoginResponse): void
  refreshToken(): Promise<void>
  signIn(googleResponse: GoogleLoginResponseOffline | GoogleLoginResponse): void
  signOut(): void
  onAutoLoadFinished(): void
  updateUserList(): Promise<void>
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter()
  const { storedLists, clearCookies } = useApp()

  const [refreshTokenTiming, setRefreshTokenTiming] = useState(3300000)
  const [googleResponse, setGoogleResponse] = useState<GoogleLoginResponse>()
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)

  const refreshToken = async () => {
    if (googleResponse) {
      const newAuthRes = await googleResponse.reloadAuthResponse()
      setRefreshTokenTiming((newAuthRes.expires_in || 3300) * 1000)

      setTimeout(refreshToken, refreshTokenTiming)
    }
  }

  const signIn = (
    googleResponse: GoogleLoginResponseOffline | GoogleLoginResponse
  ) => {
    const response = googleResponse as GoogleLoginResponse
    const newUser = response.profileObj as User

    setLoading(true)

    ListService.getUserLists(newUser.googleId)
      .then(async (result) => {
        newUser.lists = ArrayUtils.sortBy("fields.name", result)

        const sessionLists = [...storedLists]
        sessionLists.map((list) => (list.fields.googleID = newUser.googleId))

        if (sessionLists?.length > 0) {
          await ListService.syncLists(sessionLists)

          clearCookies()
        }

        setGoogleResponse(response)
        setUser(newUser)
      })
      .finally(() => setLoading(false))
  }

  const signOut = () => {
    setUser(undefined)
    router.reload()
  }

  const onAutoLoadFinished = () => {
    setLoading(false)
  }

  const updateUserList = async () => {
    if (user) {
      const newUser = { ...user }
      const lists = await ListService.getUserLists(newUser.googleId)

      newUser.lists = ArrayUtils.sortBy("fields.name", lists)
      setUser(newUser)
    }
  }

  useEffect(() => {
    setTimeout(refreshToken, refreshTokenTiming)
  }, [googleResponse])

  return (
    <AuthContext.Provider
      value={{
        user,
        googleResponse,
        loading,
        setLoading,
        setGoogleResponse,
        refreshToken,
        signIn,
        signOut,
        onAutoLoadFinished,
        updateUserList,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return AppUtils.ValidateContext<AuthContextProps>(AuthContext)
}
