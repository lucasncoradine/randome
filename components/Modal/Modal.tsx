import React, { useEffect, useState } from "react"
import { X } from "react-feather"
import { Button } from "../Button"
import { Grid, GridItem } from "../Grid"
import { Typography } from "../Typography/Typography"
import {
  ModalBody,
  ModalContainer,
  ModalTitle,
  ModalWrapper,
} from "./modal.styled"

export interface ModalProps {
  title: string
  open: boolean
  onClose?(): void
  showCloseButton?: boolean
  size?: "sm" | "md" | "lg"
}

export const Modal: React.FC<ModalProps> = ({
  title,
  open,
  showCloseButton = true,
  onClose,
  size = "md",
  children,
}) => {
  const [isOpen, setIsOpen] = useState(open)
  const classes = `modal--${size}`

  const handleClose = () => {
    setIsOpen(false)

    onClose?.()
  }

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <ModalWrapper open={isOpen}>
      <ModalContainer direction="column" className={classes}>
        <ModalTitle col={12}>
          <Grid alignItems="center" justifyContent="space-between">
            <GridItem>
              <Typography weight="extrabold" variant="h3">
                {title}
              </Typography>
            </GridItem>

            {showCloseButton && (
              <GridItem>
                <Button
                  variant="normal"
                  size="normal"
                  leftIcon={X}
                  onClick={handleClose}
                />
              </GridItem>
            )}
          </Grid>
        </ModalTitle>

        <ModalBody>{children}</ModalBody>
      </ModalContainer>
    </ModalWrapper>
  )
}
