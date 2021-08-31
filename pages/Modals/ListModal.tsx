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
import { ListModel } from "../../models/List.model"
import { ListService } from "../../services/ListService"
import { AppUtils } from "../../utils/utils"

export const ListModal: React.FC<ModalProps> = (props) => {
  const { user, updateUserList } = useAuth()
  const { toggleToast, addList, storedLists } = useApp()

  const [listName, setListName] = useState("")
  const [newItem, setNewItem] = useState("")
  const [items, setItems] = useState<string[]>([])
  const [showLoader, setShowLoader] = useState(false)
  const [enableButton, setEnableButton] = useState(false)
  const lists = [...storedLists, ...(user?.lists || [])]

  const validateList = (): string | null => {
    const exists = lists.find((list) => list.fields.name === listName)

    if (exists) return "Já existe uma lista com o mesmo nome."

    return null
  }

  const handleListNameChange = (value: string) => {
    setListName(value)
    setEnableButton(!!value)
  }

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
    const validate = validateList()

    if (validate) {
      toggleToast(validate, "error")

      return
    }

    setShowLoader(true)

    let promise = Promise.resolve(
      addList(new ListModel(AppUtils.generateUUID(), listName, items))
    )

    if (user) promise = ListService.saveList(listName, user.googleId, items)

    Promise.resolve(promise)
      .then(async () => {
        if (user) await updateUserList()

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
            onChange={(value) => handleListNameChange(value)}
            mandatory
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
                disabled={!enableButton}
                submitOnKeyPress
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Modal>
  )
}
