import React from "react"
import { GridContainer } from "./grid.styled"

export type FlexPosition =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
export type FlexDirection = "column" | "row"

interface GridProps {
  alignItems?: FlexPosition
  justifyContent?: FlexPosition
  direction?: FlexDirection
  spacing?: number
  height?: number | string
  className?: string
}

export const Grid: React.FC<GridProps> = ({
  alignItems = "flex-start",
  justifyContent = "flex-start",
  direction = "row",
  spacing = 0,
  height,
  className,
  children,
}) => {
  const classes = `grid--${direction} ${className}`

  return (
    <GridContainer
      className={classes}
      align={alignItems}
      justify={justifyContent}
      spacing={spacing}
      height={height}
    >
      {children}
    </GridContainer>
  )
}
