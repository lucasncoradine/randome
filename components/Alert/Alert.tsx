import React from "react"
import { AlertTriangle } from "react-feather"
import { Grid, GridItem, Icon } from ".."
import { AlertContainer, AlertIcon } from "./alert.styled"

export const Alert: React.FC = ({ children }) => {
  return (
    <AlertContainer>
      <Grid alignItems="center">
        <AlertIcon>
          <Icon icon={AlertTriangle} size={37} />
        </AlertIcon>

        <GridItem alignItems="center">{children}</GridItem>
      </Grid>
    </AlertContainer>
  )
}
