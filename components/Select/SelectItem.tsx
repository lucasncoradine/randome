import React from "react"
import { Button, ButtonProps } from "../Button/Button"

export interface SelectItemProps extends ButtonProps {
  closeOnClick?: boolean
  selected?: boolean
  label: string
  value: string | number
}

export const SelectItem: React.FC<SelectItemProps> = ({
  label,
  ...buttonProps
}) => {
  return <Button variant="transparent" label={label} {...buttonProps} />
}
