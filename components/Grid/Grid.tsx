import React from "react"
import { GridContainer } from "./grid.styled"

export type FlexPosition = "flex-start" | "center" | "flex-end"
export type FlexDirection = "column" | "row"

interface GridProps {
  alignItems?: FlexPosition
  justifyContent?: FlexPosition
  direction?: FlexDirection
  className?: string
}

export const Grid: React.FC<GridProps> = ({
  alignItems = "flex-start",
  justifyContent = "flex-start",
  direction = "row",
  className,
  children,
}) => {
  const classes = `grid--${direction} ${className}`

  return (
    <GridContainer
      className={classes}
      align={alignItems}
      justify={justifyContent}
    >
      {children}
    </GridContainer>
  )
}
