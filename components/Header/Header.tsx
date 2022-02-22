import { useApp, useAuth } from "@contexts"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { Moon, Plus, Settings } from "react-feather"
import { Button, Grid, GridItem, Select, SelectItem } from ".."
import { LoginButton, LogoutButton } from "../../Auth/GoogleAuth"
import { List } from "@models"
import { ListModal } from "../../pages/Modals/ListModal/ListModal"
import { HeaderContainer } from "./header.styled"
import { Route } from "@enums"

export const Header: React.FC = () => {
  const { storedLists, selectedList, selectList } = useApp()
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [lists, setLists] = useState<List[]>([])

  const handleListChange = (selected: { value: string; label: string }) => {
    const list = lists.find((x) => x.id === selected.value)

    if (list) selectList(list)
  }

  useEffect(() => {
    const userLists = user ? user.lists : []
    setLists([...storedLists, ...userLists])
  }, [storedLists, user])

  return (
    <HeaderContainer>
      <Grid alignItems="center">
        <GridItem col={6}>
          <Link href={Route.Home}>
            <a>
              <Image src="/logo.svg" width={240} height={70} />
            </a>
          </Link>
        </GridItem>

        <GridItem col={6}>
          <Grid justifyContent="flex-end" spacing={2}>
            <GridItem>
              <Select
                width={180}
                placeholder="Selecionar Lista"
                onChange={handleListChange}
              >
                {lists.map((list) => (
                  <SelectItem
                    selected={selectedList?.id === list.id}
                    key={list.id}
                    value={list.id}
                    label={list.fields.name}
                  />
                ))}

                <Button
                  variant="transparent-secondary"
                  label="Nova lista"
                  leftIcon={Plus}
                  onClick={() => setModalOpen(true)}
                  submitOnKeyPress
                  keyEvent={{ shiftKey: true, key: "N" }}
                />
              </Select>
            </GridItem>

            <GridItem>
              <Select variant="transparent" icon={Settings} hideArrow>
                <Button
                  variant="transparent-secondary"
                  label="Gerenciar listas"
                  href={Route.List}
                />
                <Button
                  variant="transparent-secondary"
                  label="Tema escuro"
                  leftIcon={Moon}
                  disabled
                />
                <>{!user && <LoginButton variant="transparent-secondary" />}</>
                <>{user && <LogoutButton variant="transparent-secondary" />}</>
              </Select>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>

      {modalOpen && (
        <ListModal
          title="Nova Lista"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          size="md"
        />
      )}
    </HeaderContainer>
  )
}
