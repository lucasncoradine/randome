import React from "react"
import { Button, Grid, GridItem, Select, SelectItem } from ".."
import { HeaderContainer } from "./header.styled"
import Image from "next/image"
import { Settings, User } from "react-feather"
import { LoginButton, LogoutButton } from "../../Auth/GoogleAuth"
import { useAuth } from "../../contexts/AuthContext"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { user } = useAuth()

  return (
    <HeaderContainer>
      <Grid alignItems="center">
        <GridItem col={6}>
          <Image src="/logo.svg" width={240} height={70} />
        </GridItem>

        <GridItem col={6}>
          <Grid justifyContent="flex-end" spacing={2}>
            <GridItem>
              <Select
                width={180}
                placeholder="Selecionar Lista"
                variant="terciary"
                disabled={!user}
              >
                <SelectItem value={1} label="Lista 1" />
                <SelectItem value={2} label="Lista 2" />
              </Select>
            </GridItem>

            <GridItem>
              <Select variant="transparent" icon={User}>
                <>{!user && <LoginButton />}</>

                <>
                  {user && (
                    <>
                      <SelectItem value={0} label={user?.name.split(" ")[0]} />
                      <LogoutButton />
                    </>
                  )}
                </>
              </Select>
            </GridItem>

            <GridItem>
              <Button leftIcon={Settings} />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </HeaderContainer>
  )
}
