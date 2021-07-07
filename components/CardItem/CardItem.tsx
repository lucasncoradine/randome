import React from "react"
import { Edit2, Trash } from "react-feather"
import { Button, Grid } from ".."
import { GridItem } from "../Grid"
import { Typography } from "../Typography/Typography"
import { CardItemContainer } from "./cardItem.styled"

interface CardItemProps {
  label: string
  disableEdit?: boolean
  disableRemove?: boolean
  onEdit?(): void
  onRemove?(): void
}

export const CardItem: React.FC<CardItemProps> = ({
  label,
  disableEdit = false,
  disableRemove = false,
  onEdit,
  onRemove,
}) => {
  return (
    <CardItemContainer>
      <Grid justifyContent="space-between" alignItems="center">
        <GridItem>
          <Typography>{label}</Typography>
        </GridItem>

        <GridItem>
          <Grid spacing={1}>
            {!disableEdit && (
              <GridItem>
                <Button
                  variant="normal"
                  leftIcon={Edit2}
                  size="small"
                  onClick={() => onEdit?.()}
                />
              </GridItem>
            )}

            {!disableRemove && (
              <GridItem>
                <Button
                  variant="normal"
                  leftIcon={Trash}
                  size="small"
                  onClick={() => onRemove?.()}
                />
              </GridItem>
            )}
          </Grid>
        </GridItem>
      </Grid>
    </CardItemContainer>
  )
}
