import React, { useState } from "react"
import {
  Alert,
  Button,
  Grid,
  GridItem,
  Header,
  LinkButton,
  Typography,
} from "../../components"
import { LoginButton } from "../../Auth/GoogleAuth"
import { Color } from "../../styles/vars.styled"
import { AnimatedEmoji, Footer } from "./home.styled"

export const HomePage: React.FC = () => {
  const emojis = "🎈🎞🎁🖼🎪👑⚽⚾🏀🏐🏈🎳🎱🛶🤿⛸🏓🏆🎯🎮🕹🎲🎸🎷💣"

  const [titleString, setTitleString] = useState(
    "Clique no botão abaixo para começar o sorteio"
  )

  const handleClick = (event: React.MouseEvent) => {}

  return (
    <Grid height="100%" direction="column" alignItems="center" spacing={5}>
      <GridItem col={12}>
        <Header />
      </GridItem>

      <GridItem col={12}>
        <Grid direction="column" alignItems="center" spacing={5}>
          <GridItem justifyContent="center" col={8}>
            <div style={{ height: 200 }}>
              <Typography
                variant="h1"
                color={Color.Secondary}
                textAlign="center"
              >
                {titleString}
              </Typography>
            </div>
          </GridItem>

          <GridItem>
            <AnimatedEmoji variant="h2">{"👇"}</AnimatedEmoji>
          </GridItem>

          <GridItem>
            <Button
              onClick={handleClick}
              size="large"
              variant="primary"
              label="Iniciar Sorteio"
            />
          </GridItem>
        </Grid>
      </GridItem>

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
            para criar uma conta e salvá-las
          </Typography>
        </Alert>
      </Footer>
    </Grid>
  )
}
