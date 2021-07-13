import React, { useEffect, useRef, useState } from "react"
import {
  Alert,
  Button,
  Grid,
  GridItem,
  Header,
  LinkButton,
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
  InitSort = "Clique no botão abaixo para começar o sorteio",
  NoItems = "Essa lista não possui nenhum item para ser sorteado 😔",
  Sorting = "Sorteando...",
  NoListSelected = "Selecione uma lista para continuar",
}

export const HomePage: React.FC = () => {
  const initialEmoji = "👇"
  const initialSortTime = 5 // TODO: Pegar das configurações do usuário
  const emojis = "🎈🎞🎁🖼🎪👑⚽⚾🏀🏐🏈🎳🎱🛶🤿⛸🏓🏆🎯🎮🕹🎲🎸🎷💣"

  const timerRef = useRef<any>(null)
  const emojiTimerRef = useRef<any>(null)

  const { selectedList } = useApp()
  const { user, loading } = useAuth()

  const [winner, setWinner] = useState("")
  const [title, setTitle] = useState<string>(Titles.InitSort)
  const [emoji, setEmoji] = useState(initialEmoji)
  const [sortTime, setSortTime] = useState(initialSortTime)
  const [isSorting, setIsSorting] = useState(false)
  const [buttonLabel, setButtonLabel] = useState("Iniciar sorteio")

  const validateList = (): boolean => {
    return !!(selectedList && selectedList.fields.items)
  }

  const validateTitle = () => {
    if (selectedList) {
      if (selectedList.fields.items) setTitle(Titles.InitSort)
      else setTitle(Titles.NoItems)
    } else {
      setTitle(Titles.NoListSelected)
    }
  }

  const getRandomItem = () => {
    if (selectedList) {
      setIsSorting(true)
    }
  }

  useEffect(() => {
    if (isSorting) {
      setTitle(Titles.Sorting)

      timerRef.current = setInterval(() => {
        if (selectedList)
          setWinner(ArrayUtils.getRandom(selectedList.fields.items.split(";")))

        setSortTime((time) => time - 1)
      }, 1000)

      emojiTimerRef.current = setInterval(() => {
        const randomEmoji = ArrayUtils.getRandom(Array.from(emojis))

        setEmoji(randomEmoji)
      }, 120)
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
      setEmoji("🎉")
      setTitle(winner)
      setButtonLabel("Novo sorteio")
    }
  }, [sortTime])

  useEffect(() => {
    validateTitle()
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

          {validateList() && (
            <GridItem>
              <AnimatedEmoji animated={emoji === initialEmoji} variant="h1">
                {emoji}
              </AnimatedEmoji>
            </GridItem>
          )}

          <GridItem>
            <Button
              disabled={!validateList()}
              size="large"
              variant="primary"
              label={buttonLabel}
              onClick={getRandomItem}
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
              <LinkButton
                color={Color.Secondary3}
                label="Clique aqui"
                href="#"
              ></LinkButton>{" "}
              para entrar em uma conta Google e salvá-las.
            </Typography>
          </Alert>
        </Footer>
      )}
    </Grid>
  )
}
