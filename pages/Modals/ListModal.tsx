import React, { useState } from "react"
import { Plus } from "react-feather"
import {
  Button,
  CardItem,
  Grid,
  GridItem,
  Input,
  Loader,
  Modal,
  Typography,
} from "../../components"
import { ModalProps } from "../../components/Modal/Modal"
import { useApp } from "../../contexts/AppContext"
import { useAuth } from "../../contexts/AuthContext"
import { ListService } from "../../services/ListService"

export const ListModal: React.FC<ModalProps> = (props) => {
  const { user, updateUserList } = useAuth()
  const { toggleToast } = useApp()

  const [listName, setListName] = useState("")
  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState<string[]>([])
  const [showLoader, setShowLoader] = useState(false)

  const addItem = () => {
    if (newItem) {
      setItems([...items, newItem])
      setNewItem("")
    }
  }

  const removeIndex = (index: number) => {
    const itemsCopy = [...items]
    itemsCopy.splice(index, 1)

    setItems(itemsCopy)
  }

  const saveList = async () => {
    setShowLoader(true)

    let promise

    if (user) promise = ListService.saveList(listName, user.googleId, items)

    Promise.resolve(promise)
      .then(async () => {
        await updateUserList()

        toggleToast("Lista criada com sucesso!", "success")
      })
      .catch((error) => {
        toggleToast("Erro ao criar a lista!", "error")
        console.error(error)
      })
      .finally(() => {
        setShowLoader(false)
        props.onClose?.()
      })
  }

  return (
    <Modal {...props}>
      <Grid direction="column" spacing={4}>
        <Loader show={showLoader} />

        <GridItem col={6}>
          <Input
            label="Nome"
            placeholder="Nome da Lista"
            value={listName}
            onChange={(value) => setListName(value)}
            autoFocus
            type="text"
          />
        </GridItem>

        <GridItem col={12}>
          <Grid spacing={2} direction="column">
            <GridItem>
              <Typography variant="h4" weight="extrabold">
                Itens
              </Typography>
            </GridItem>

            <GridItem col={12}>
              <Grid spacing={1} direction="column">
                <GridItem col={12}>
                  <Grid alignItems="center" spacing={1}>
                    <GridItem col={6}>
                      <Input
                        placeholder="Novo item"
                        value={newItem}
                        onChange={(value) => setNewItem(value)}
                        onEnter={() => addItem()}
                      />
                    </GridItem>

                    <GridItem>
                      <Button
                        leftIcon={Plus}
                        size="small"
                        onClick={() => addItem()}
                      />
                    </GridItem>
                  </Grid>
                </GridItem>

                {items.map((item, index) => (
                  <GridItem key={index} col={12}>
                    <CardItem
                      disableEdit
                      label={item}
                      onRemove={() => removeIndex(index)}
                    />
                  </GridItem>
                ))}
              </Grid>
            </GridItem>
          </Grid>
        </GridItem>

        <GridItem col={12}>
          <Grid justifyContent="flex-end" spacing={2}>
            <GridItem>
              <Button
                variant="normal"
                label="Cancelar"
                onClick={() => props.onClose?.()}
              />
            </GridItem>

            <GridItem>
              <Button
                variant="primary"
                label="Salvar"
                onClick={() => saveList()}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Modal>
  )
}
