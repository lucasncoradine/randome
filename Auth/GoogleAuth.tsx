import React from "react"
import { LogOut } from "react-feather"
import { GoogleLogin, GoogleLogout } from "react-google-login"
import { Button } from "../components"
import { ButtonProps } from "../components/Button/Button"
import { useAuth } from "../contexts/AuthContext"

const clientId = process.env.GOOGLE_CLIENT_ID || ""

export const LoginButton: React.FC<ButtonProps> = (props) => {
  const { signIn, setLoading, onAutoLoadFinished } = useAuth()
  const buttonProps = { ...props }
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      onSuccess={signIn}
      onFailure={(e) => console.error(e)}
      onRequest={() => setLoading(true)}
      onAutoLoadFinished={onAutoLoadFinished}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
      render={(props) => (
        <Button
          {...buttonProps}
          leftIcon="/google-icon.svg"
          label="Entrar com Google"
          onClick={props.onClick}
        />
      )}
    ></GoogleLogin>
  )
}

export const LogoutButton: React.FC<ButtonProps> = (props) => {
  const { signOut } = useAuth()
  const buttonProps = { ...props }

  return (
    <GoogleLogout
      clientId={clientId}
      onLogoutSuccess={signOut}
      render={(props) => (
        <Button
          {...buttonProps}
          leftIcon={LogOut}
          label="Sair"
          onClick={props.onClick}
        />
      )}
    ></GoogleLogout>
  )
}
