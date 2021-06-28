import React, { createContext, useEffect, useState } from "react"
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login"
import { List } from "../models/List.model"
import { ListService } from "../services/ListService"
import { AppUtils } from "../utils/utils"

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
  refreshToken(): void
  signIn(googleResponse: GoogleLoginResponseOffline | GoogleLoginResponse): void
  signOut(): void
  onAutoLoadFinished(): void
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
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
    const user = response.profileObj as User

    setLoading(true)

    ListService.getUserLists(user.googleId)
      .then((result) => {
        user.lists = result

        setGoogleResponse(response)
        setUser(user)
      })
      .finally(() => setLoading(false))
  }

  const signOut = () => {
    setUser(undefined)
  }

  const onAutoLoadFinished = () => {
    setLoading(false)
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return AppUtils.ValidateContext<AuthContextProps>(AuthContext)
}
