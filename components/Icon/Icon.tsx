import React from "react"
import { Icon as FeatherIcon } from "react-feather"
import { Color } from "../../styles/vars.styled"
import { IconWrapper } from "./icon.styled"
import Image from "next/image"

export type IconType = FeatherIcon | string

interface IconProps {
  icon: IconType
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
  const renderIcon = () => {
    if (typeof icon === "string") {
      return <Image src={icon} width={size || 24} height={size || 24} />
    } else {
      const IconElement = icon

      return <IconElement color={color} size={size} />
    }
  }

  return <IconWrapper className={className}>{renderIcon()}</IconWrapper>
}
