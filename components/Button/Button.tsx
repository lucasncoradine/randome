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
  | "normal"
type Size = "normal" | "large" | "small"

export interface ButtonProps {
  label?: string
  leftIcon?: IconType
  rightIcon?: IconType
  variant?: Variant
  disabled?: boolean
  size?: Size
  className?: string
  type?: "button" | "submit" | undefined
  scale?: boolean
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
  type = "button",
  scale = false,
  className,
}) => {
  const classes = `button--${variant} ${
    leftIcon && "button--icon"
  } size--${size} ${className}`

  const typographyVariant: Record<string, TypographyVariant> = {
    normal: "p",
    large: "h3",
  }

  let iconSize = 24

  if (label || size === "small") iconSize = 20

  return (
    <ButtonElement
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      scale={scale}
    >
      {leftIcon && (
        <Icon icon={leftIcon} size={iconSize} className="buttonIcon--left" />
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
