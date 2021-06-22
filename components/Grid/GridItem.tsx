import React from "react"
import { FlexPosition } from "./Grid"
import { GridItemContainer } from "./grid.styled"

interface GridItemProps {
  alignItems?: FlexPosition
  justifyContent?: FlexPosition
  col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  className?: string
}

export const GridItem: React.FC<GridItemProps> = ({
  alignItems = "flex-start",
  justifyContent = "flex-start",
  col,
  className,
  children,
}) => {
  return (
    <GridItemContainer col={col} align={alignItems} justify={justifyContent}>
      {children}
    </GridItemContainer>
  )
}
