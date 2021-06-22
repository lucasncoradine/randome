import React from "react"
import { Icon as FeatherIcon } from "react-feather"
import { Icon } from ".."
import { Color } from "../../styles/vars.styled"
import {
  Typography,
  Variant as TypographyVariant,
} from "../Typography/Typography"
import { ButtonElement } from "./button.styled"

type Variant = "primary" | "secondary" | "transparent"
type Size = "normal" | "large"

interface ButtonProps {
  label?: string
  icon?: FeatherIcon
  variant?: Variant
  disabled?: boolean
  size?: Size
  className?: string
  onClick?(event: React.MouseEvent): void
}

export const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  variant = "transparent",
  disabled,
  size = "normal",
  onClick,
  className,
}) => {
  const classes = `button--${variant} ${
    icon && "button--icon"
  } size--${size} ${className}`

  const typographyVariant: Record<string, TypographyVariant> = {
    normal: "p",
    large: "h3",
  }

  return (
    <ButtonElement onClick={onClick} className={classes} disabled={disabled}>
      {icon && (
        <Icon icon={icon} size={label ? 20 : 24} className="buttonIcon" />
      )}

      {label && (
        <Typography
          variant={typographyVariant[size]}
          className="buttonLabel"
          weight="bold"
        >
          {label}
        </Typography>
      )}
    </ButtonElement>
  )
}
