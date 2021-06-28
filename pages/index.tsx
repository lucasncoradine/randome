import React from "react"
import { AppProvider } from "../contexts/AppContext"
import { AuthProvider } from "../contexts/AuthContext"
import { Container } from "../styles/index.styled"
import { HomePage } from "./Home/HomePage"

export default function Home() {
  return (
    <AppProvider>
      <AuthProvider>
        <Container>
          <HomePage />
        </Container>
      </AuthProvider>
    </AppProvider>
  )
}
