import React from "react"
import { Button, Grid, GridItem } from ".."
import { HeaderContainer } from "./header.styled"
import Image from "next/image"
import { Settings, User } from "react-feather"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <HeaderContainer>
      <Grid alignItems="center">
        <GridItem col={6}>
          <Image src="/logo.svg" width={240} height={70} />
        </GridItem>

        <GridItem col={6}>
          <Grid justifyContent="flex-end" spacing={2}>
            <GridItem>
              <Button icon={User} />
            </GridItem>

            <GridItem>
              <Button icon={Settings} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </HeaderContainer>
  )
}
