import { Grid, GridItem, Icon } from "@components"
import React from "react"
import { Check, Info, XOctagon } from "react-feather"
import { ToastContainer } from "./toast.styled"

export type ToastVariant = "info" | "success" | "error"

export interface ToastProps {
  variant: ToastVariant
  message: string
  show?: boolean
}

export const Toast: React.FC<ToastProps> = ({
  variant = "info",
  message,
  show = false,
}) => {
  const icons = {
    info: Info,
    success: Check,
    error: XOctagon,
  }

  return (
    <ToastContainer show={show} className={`toast--${variant}`}>
      <Grid spacing={2} alignItems="center">
        <GridItem>
          <Icon icon={icons[variant]} />
        </GridItem>

        <GridItem>{message}</GridItem>
      </Grid>
    </ToastContainer>
  )
}
