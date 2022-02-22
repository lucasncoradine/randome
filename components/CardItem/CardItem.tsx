import { Button, Grid, GridItem, Typography } from "@components"
import { Color } from "@styles"
import { TypographyVariant } from "components/Typography/Typography"
import React from "react"
import { Edit2, Trash } from "react-feather"
import { CardItemContainer, CardInfo } from "./cardItem.styled"

interface CardItemProps {
  label: string
  labelVariant?: TypographyVariant
  disableEdit?: boolean
  disableRemove?: boolean
  info?: string
  onEdit?(): void
  onRemove?(): void
}

export const CardItem: React.FC<CardItemProps> = ({
  label,
  labelVariant = "p",
  disableEdit = false,
  disableRemove = false,
  info,
  onEdit,
  onRemove,
}) => {
  return (
    <CardItemContainer>
      <Grid justifyContent="space-between" alignItems="center">
        <GridItem>
          <Typography variant={labelVariant}>{label}</Typography>
        </GridItem>

        <GridItem>
          <Grid spacing={1} alignItems="center">
            {info && (
              <GridItem>
                <CardInfo variant="small">{info}</CardInfo>
              </GridItem>
            )}

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
