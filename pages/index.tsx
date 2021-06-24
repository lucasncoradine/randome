import React from "react"
import { AuthProvider } from "../contexts/AuthContext"
import { Container } from "../styles/index.styled"
import { HomePage } from "./Home/HomePage"

export default function Home() {
  return (
    <AuthProvider>
      <Container>
        <HomePage />
      </Container>
    </AuthProvider>
  )
}
