import React from "react"
import { Button, ButtonProps } from "../Button/Button"
import { SelectItemWrapper } from "./select.styled"

export interface SelectItemProps extends ButtonProps {
  closeOnClick?: boolean
  selected?: boolean
  label: string
  value: string | number
}

export const SelectItem: React.FC<SelectItemProps> = ({
  closeOnClick = true,
  selected = false,
  label,
  value,
  children,
  ...buttonProps
}) => {
  return <Button variant="transparent" label={label} {...buttonProps} />
}
