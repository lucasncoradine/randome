import React from "react"
import { AppProvider } from "../contexts/AppContext"
import { AuthProvider } from "../contexts/AuthContext"
import { CookiesProvider } from "../contexts/CookiesContext"
import { Container } from "../styles/index.styled"
import { HomePage } from "./Home/HomePage"

export default function Home() {
  return (
    <CookiesProvider>
      <AppProvider>
        <AuthProvider>
          <Container>
            <HomePage />
          </Container>
        </AuthProvider>
      </AppProvider>
    </CookiesProvider>
  )
}
