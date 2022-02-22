import {
  Button,
  CardItem,
  Dialog,
  Grid,
  GridItem,
  Typography,
} from "@components"
import { useApp, useAuth } from "@contexts"
import { Route } from "@enums"
import { List } from "@models"
import { Color, ListsContainer } from "@styles"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { ChevronLeft } from "react-feather"

export const Lists: React.FC = () => {
  const { storedLists } = useApp()
  const { user } = useAuth()
  const router = useRouter()
  const [lists, setLists] = useState<List[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const userLists = user ? user.lists : []
    setLists([...storedLists, ...userLists])
  }, [storedLists, user])

  return (
    <ListsContainer>
      <Grid direction="column" spacing={1}>
        <GridItem>
          <Button
            leftIcon={ChevronLeft}
            label="Voltar"
            variant="transparent-secondary"
            size="small"
            href={Route.Home}
          />
        </GridItem>

        <GridItem>
          <Typography color={Color.Secondary} variant="h1">
            Minhas listas
          </Typography>
        </GridItem>

        {lists.map((list) => {
          const items = list.fields.items
          const itemsCount =
            list.fields.items?.length > 0
              ? `${items.split(";").length} itens`
              : "Sem itens"

          return (
            <GridItem key={list.id} justifyContent="center" col={12}>
              <CardItem
                label={list.fields.name}
                labelVariant="h4"
                info={itemsCount}
                onEdit={() => router.replace(Route.Home)}
                onRemove={() => setDialogOpen(true)}
              />
            </GridItem>
          )
        })}

        <Dialog
          title="Confirmar esclusão"
          message="Deseja realmente excluir essa lista?"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        >
          <Grid justifyContent="center" spacing={10}>
            <GridItem>
              <Button
                variant="normal"
                label="Cancelar"
                onClick={() => setDialogOpen(false)}
              />
            </GridItem>

            <GridItem>
              <Button variant="primary" label="Sim, excluir" />
            </GridItem>
          </Grid>
        </Dialog>
      </Grid>
    </ListsContainer>
  )
}

export default Lists
