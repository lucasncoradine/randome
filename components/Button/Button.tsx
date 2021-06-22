import React from "react"
import { Icon as FeatherIcon } from "react-feather"
import { Icon } from ".."
import { Color } from "../../styles/vars.styled"
import { Typography } from "../Typography/Typography"
import { ButtonElement } from "./button.styled"

type Variant = "primary" | "secondary" | "link" | "transparent"

interface ButtonProps {
  label?: string
  icon?: FeatherIcon
  variant?: Variant
  disabled?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  variant = "transparent",
  disabled,
  className,
}) => {
  const classes = `button--${variant} ${className}`

  return (
    <ButtonElement className={classes} disabled={disabled}>
      {icon && (
        <Icon icon={icon} size={label ? 20 : 24} className="buttonIcon" />
      )}

      {label && <Typography weight="bold">{label}</Typography>}
    </ButtonElement>
  )
}
