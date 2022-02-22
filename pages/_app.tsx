import React from "react"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AppProvider, AuthProvider, CookiesProvider } from "@contexts"
import { Container } from "@styles"
import { Header } from "@components"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <AppProvider>
        <AuthProvider>
          <Container>
            <Header />
            <Component {...pageProps} />
          </Container>
        </AuthProvider>
      </AppProvider>
    </CookiesProvider>
  )
}
export default MyApp
