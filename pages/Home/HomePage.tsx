import React, { useEffect, useRef, useState } from "react"
import {
  Alert,
  Button,
  Grid,
  GridItem,
  Header,
  Loader,
  Typography,
} from "../../components"
import { Confetti } from "../../components/Particles/Confetti/Confetti"
import { useApp } from "../../contexts/AppContext"
import { useAuth } from "../../contexts/AuthContext"
import { Color } from "../../styles/vars.styled"
import { ArrayUtils } from "../../utils/arrayUtils"
import { AnimatedEmoji, Footer, TitleContainer } from "./home.styled"

enum Titles {
  NotStarted = "Clique no botão abaixo para começar o sorteio",
  NoItems = "Essa lista não possui nenhum item para ser sorteado 😔",
  Sorting = "Sorteando...",
  NoListSelected = "Selecione uma lista para continuar",
}

export const HomePage: React.FC = () => {
  const initialEmoji = "👇"
  const initialSortTime = 5 // TODO: Pegar das configurações do usuário (segundos)
  const emojis = "🎈🎞🎁🖼🎪👑⚽⚾🏀🏐🏈🎳🎱🛶🤿⛸🏓🏆🎯🎮🕹🎲🎸🎷💣"

  const timerRef = useRef<any>(null)
  const emojiTimerRef = useRef<any>(null)

  const { selectedList } = useApp()
  const { user, loading } = useAuth()

  const [winner, setWinner] = useState("")
  const [title, setTitle] = useState<string>(Titles.NotStarted)
  const [emoji, setEmoji] = useState(initialEmoji)
  const [sortTime, setSortTime] = useState(initialSortTime)
  const [isSorting, setIsSorting] = useState(false)
  const [buttonLabel, setButtonLabel] = useState("Iniciar sorteio")

  const validSelectedList = !!(selectedList && selectedList.fields?.items)

  const validateTitle = () => {
    if (selectedList) {
      if (selectedList.fields.items) {
        setTitle(Titles.NotStarted)
        setEmoji(initialEmoji)
      } else setTitle(Titles.NoItems)
    } else {
      setTitle(Titles.NoListSelected)
    }
  }

  const initSort = () => {
    if (selectedList) {
      setTitle("")
      setEmoji("")
      setIsSorting(true)
    }
  }

  useEffect(() => {
    if (isSorting) {
      setButtonLabel("Sorteando...")

      timerRef.current = setInterval(() => {
        if (validSelectedList) {
          const winnerValue = ArrayUtils.getRandom(
            selectedList.fields.items.split(";")
          )

          setWinner(winnerValue)
        }

        setSortTime((time) => time - 1)
      }, 1000)

      emojiTimerRef.current = setInterval(() => {
        if (selectedList) {
          const randomValue = ArrayUtils.getRandom(
            selectedList.fields.items.split(";")
          )

          setTitle(randomValue)
        }
      }, 100)
    }

    return () => {
      clearInterval(timerRef.current)
      clearInterval(emojiTimerRef.current)
    }
  }, [isSorting])

  useEffect(() => {
    if (sortTime === 0) {
      setIsSorting(false)
      setSortTime(initialSortTime)
      setButtonLabel("Novo sorteio")
    }
  }, [sortTime])

  useEffect(() => {
    clearInterval(timerRef.current)
    clearInterval(emojiTimerRef.current)

    validateTitle()
    setWinner("")
    setSortTime(initialSortTime)
    setIsSorting(false)
    setButtonLabel("Iniciar sorteio")
  }, [selectedList])

  return (
    <Grid height="100%" direction="column" alignItems="center" spacing={5}>
      <Loader hideBackground showLogo show={loading} />

      {!isSorting && winner && <Confetti />}

      <GridItem col={12}>
        <Header />
      </GridItem>

      <GridItem col={12}>
        <Grid direction="column" alignItems="center" spacing={5}>
          <GridItem justifyContent="center" col={8}>
            <TitleContainer>
              <Typography
                variant="h1"
                color={Color.Secondary}
                textAlign="center"
              >
                {title}
              </Typography>
            </TitleContainer>
          </GridItem>

          {validSelectedList && (
            <GridItem>
              <AnimatedEmoji animated={emoji === initialEmoji} variant="h1">
                {emoji}
              </AnimatedEmoji>
            </GridItem>
          )}

          <GridItem>
            <Button
              disabled={!validSelectedList || isSorting}
              size="large"
              variant="primary"
              label={buttonLabel}
              onClick={initSort}
              scale
            />
          </GridItem>
        </Grid>
      </GridItem>

      {!user && (
        <Footer justifyContent="center" col={12}>
          <Alert>
            <Typography>
              As configurações definidas por você não estão sendo salvas.
              <br />
              Entre com uma conta Google e salvá-las.
            </Typography>
          </Alert>
        </Footer>
      )}
    </Grid>
  )
}
