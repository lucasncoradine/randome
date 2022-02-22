import { ButtonProps, Grid, GridItem, Modal } from "@components"
import { Typography } from "components/Typography/Typography"
import React, { useEffect, useState } from "react"

interface DialogProps {
  open: boolean
  onClose(): void
  title: string
  message: string
  children: React.ReactElement<ButtonProps>[] | React.ReactElement<ButtonProps>
}

export const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  message,
  children,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    setDialogOpen(open)
  }, [open])

  return (
    <Modal
      size="sm"
      title={title}
      open={dialogOpen}
      onClose={onClose}
      hideHeader
    >
      <Grid direction="column" justifyContent="space-between" spacing={5}>
        <GridItem>
          <Typography variant="h4">{message}</Typography>
        </GridItem>

        <GridItem col={12}>
          <Grid>
            <GridItem col={12}>{children}</GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Modal>
  )
}
