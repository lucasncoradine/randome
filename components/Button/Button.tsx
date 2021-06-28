import React from "react"
import { Icon } from ".."
import { IconType } from "../Icon/Icon"
import {
  Typography,
  Variant as TypographyVariant,
} from "../Typography/Typography"
import { ButtonElement } from "./button.styled"

export type Variant =
  | "primary"
  | "secondary"
  | "terciary"
  | "transparent"
  | "transparent-secondary"
type Size = "normal" | "large"

export interface ButtonProps {
  label?: string
  leftIcon?: IconType
  rightIcon?: IconType
  variant?: Variant
  disabled?: boolean
  size?: Size
  className?: string
  onClick?(event: React.MouseEvent): void
}

export const Button: React.FC<ButtonProps> = ({
  label,
  leftIcon,
  rightIcon,
  variant = "transparent",
  disabled,
  size = "normal",
  onClick,
  className,
}) => {
  const classes = `button--${variant} ${
    leftIcon && "button--icon"
  } size--${size} ${className}`

  const typographyVariant: Record<string, TypographyVariant> = {
    normal: "p",
    large: "h3",
  }

  return (
    <ButtonElement onClick={onClick} className={classes} disabled={disabled}>
      {leftIcon && (
        <Icon
          icon={leftIcon}
          size={label ? 20 : 24}
          className="buttonIcon--left"
        />
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

      {rightIcon && (
        <Icon
          icon={rightIcon}
          size={label ? 20 : 24}
          className="buttonIcon--right"
        />
      )}
    </ButtonElement>
  )
}
