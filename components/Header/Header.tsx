import Image from "next/image"
import React from "react"
import { Moon, Plus, Settings } from "react-feather"
import { Button, Grid, GridItem, Select, SelectItem } from ".."
import { LoginButton, LogoutButton } from "../../Auth/GoogleAuth"
import { useApp } from "../../contexts/AppContext"
import { useAuth } from "../../contexts/AuthContext"
import { HeaderContainer } from "./header.styled"

export const Header: React.FC = () => {
  const { selectedList, setSelectedList } = useApp()
  const { user } = useAuth()

  const handleListChange = (selected: { value: string; label: string }) => {
    const list = user?.lists.find((x) => x.id === selected.value)

    if (list) setSelectedList(list)
  }

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
                onChange={handleListChange}
              >
                {user &&
                  user.lists.map((list) => (
                    <SelectItem
                      selected={selectedList?.id === list.id}
                      key={list.id}
                      value={list.id}
                      label={list.fields.name}
                    />
                  ))}

                <Button
                  variant="terciary"
                  label="Nova lista"
                  leftIcon={Plus}
                  disabled
                />
              </Select>
            </GridItem>

            <GridItem>
              <Select variant="transparent" icon={Settings} hideArrow>
                <Button
                  variant="transparent"
                  label="Tema escuro"
                  leftIcon={Moon}
                  disabled
                />
                <>{!user && <LoginButton />}</>
                <>{user && <LogoutButton />}</>
              </Select>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </HeaderContainer>
  )
}
