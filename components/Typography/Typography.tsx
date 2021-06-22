import React from "react"
import { Color } from "../../styles/vars.styled"
import { TypographyElement } from "./typography.styled"

type Variant = "h1" | "h2" | "h3" | "h4" | "p" | "small"
type Weight = "regular" | "bold" | "extrabold"

interface TypographyProps {
  variant?: Variant
  weight?: Weight
  color?: Color
  className?: string
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  weight = "regular",
  color,
  className,
  children,
}) => {
  const classes = `typography--${variant} weight--${weight} ${className}`

  return (
    <TypographyElement
      className={classes}
      as={variant}
      color={color || "inherit"}
    >
      {children}
    </TypographyElement>
  )
}
