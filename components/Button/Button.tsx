import { Icon, IconType, Typography, TypographyVariant } from "@components"
import React, { useEffect, useRef } from "react"
import { ButtonElement } from "./button.styled"

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "terciary"
  | "transparent"
  | "transparent-secondary"
  | "normal"
type Size = "normal" | "large" | "small"

type KeyEvent = {
  ctrlKey?: boolean
  shiftKey?: boolean
  key: string
}

export interface ButtonProps {
  label?: string
  leftIcon?: IconType
  rightIcon?: IconType
  variant?: ButtonVariant
  disabled?: boolean
  size?: Size
  className?: string
  type?: "button" | "submit" | undefined
  scale?: boolean
  onClick?(): void
  submitOnKeyPress?: boolean
  keyEvent?: KeyEvent
  href?: string
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
  submitOnKeyPress = false,
  keyEvent = { ctrlKey: false, shiftKey: true, key: "Enter" },
  href,
  className,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const classes = `button--${variant} ${
    leftIcon && "button--icon"
  } size--${size} ${className}`

  const typographyVariant: Record<string, TypographyVariant> = {
    normal: "p",
    large: "h3",
  }

  let iconSize = 24

  if (label || size === "small") iconSize = 20

  const handleClick = () => {
    onClick?.()
  }

  useEffect(() => {
    if (submitOnKeyPress && !disabled) {
      document.addEventListener("keydown", (e) => {
        const ctrlPress = keyEvent.ctrlKey ? e.ctrlKey : true
        const shiftPress = keyEvent.shiftKey ? e.shiftKey : true

        if (ctrlPress && shiftPress && e.key === keyEvent.key) {
          buttonRef.current?.click()
        }
      })
    }
  }, [disabled])

  return (
    <ButtonElement
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      className={classes}
      disabled={disabled}
      scale={scale.toString()}
      as={href ? "a" : "button"}
      href={href}
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
