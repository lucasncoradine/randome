import { Color } from "@styles"
import { Typography } from "components/Typography/Typography"
import React, { useState } from "react"
import { DragAndDropWrapper, DropLabel } from "./draganddrop.styled"

export const DragAndDrop: React.FC = ({ children }) => {
  const [highlighted, setHighlighted] = useState(false)

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <DragAndDropWrapper
      hightlighted={highlighted}
      onClick={(e) => e.preventDefault()}
      onDrag={handleDrag}
      onDragEnter={() => setHighlighted(true)}
      onDragLeave={() => setHighlighted(false)}
      onDrop={handleDrop}
    >
      {highlighted && (
        <DropLabel>
          <Typography variant="h2" color={Color.Secondary3}>
            Solte para carregar
          </Typography>
        </DropLabel>
      )}

      {children}
    </DragAndDropWrapper>
  )
}
