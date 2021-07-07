import React from "react"
import { AppProvider } from "../contexts/AppContext"
import { AuthProvider } from "../contexts/AuthContext"
import { Container } from "../styles/index.styled"
import { HomePage } from "./Home/HomePage"

export default function Home() {
  return (
    <AuthProvider>
      <AppProvider>
        <Container>
          <HomePage />
        </Container>
      </AppProvider>
    </AuthProvider>
  )
}
