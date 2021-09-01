import React from "react"
import { Typography } from ".."
import { Color } from "@styles"
import { LinkButtonElement } from "./button.styled"

interface LinkButtonProps {
  label: string
  href: string
  color?: Color
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  color,
  href,
}) => {
  return (
    <LinkButtonElement href={href} color={color}>
      <Typography variant="span" weight="bold">
        {label}
      </Typography>
    </LinkButtonElement>
  )
}
