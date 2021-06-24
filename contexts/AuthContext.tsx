import React, { createContext, useContext, useEffect, useState } from "react"
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login"

interface User {
  googleId: string
  imageUrl: string
  email: string
  name: string
  givenName: string
  familyName: string
}

interface AuthContextProps {
  user: User | undefined
  setGoogleResponse(response: GoogleLoginResponse): void
  refreshToken(): void
  signIn(googleResponse: GoogleLoginResponseOffline | GoogleLoginResponse): void
  signOut(): void
}

const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider: React.FC = ({ children }) => {
  const [refreshTokenTiming, setRefreshTokenTiming] = useState(3300000)
  const [googleResponse, setGoogleResponse] = useState<GoogleLoginResponse>()
  const [user, setUser] = useState<User>()

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

    setUser(response.profileObj as User)
  }

  const signOut = () => {
    setUser(undefined)
  }

  useEffect(() => {
    setTimeout(refreshToken, refreshTokenTiming)
  }, [googleResponse])

  return (
    <AuthContext.Provider
      value={{
        user,
        setGoogleResponse,
        refreshToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error("useContext must be used within a Provider")
  }

  return context
}
