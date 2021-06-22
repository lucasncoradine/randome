import React from "react"
import { Icon as FeatherIcon } from "react-feather"
import { Color } from "../../styles/vars.styled"
import { IconWrapper } from "./icon.styled"

interface IconProps {
  icon: FeatherIcon
  color?: Color
  size?: number
  className?: string
}

export const Icon: React.FC<IconProps> = ({
  icon,
  color,
  size = 24,
  className,
}) => {
  const IconElement = icon

  return (
    <IconWrapper className={className}>
      <IconElement color={color} size={size} />
    </IconWrapper>
  )
}
