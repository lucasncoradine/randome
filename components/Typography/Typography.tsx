import React from "react"
import { Color } from "@styles"
import { TypographyElement } from "./typography.styled"

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "small"
  | "span"
type Weight = "regular" | "bold" | "extrabold"

export interface TypographyProps {
  variant?: TypographyVariant
  weight?: Weight
  color?: Color
  textAlign?: "left" | "center" | "right"
  className?: string
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "p",
  weight = "regular",
  color,
  textAlign = "left",
  className,
  children,
}) => {
  const classes = `typography--${variant} weight--${weight} ${className}`

  return (
    <TypographyElement
      className={classes}
      as={variant}
      color={color || "inherit"}
      textAlign={textAlign}
    >
      {children}
    </TypographyElement>
  )
}
