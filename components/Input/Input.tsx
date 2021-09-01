import { Grid, GridItem, Typography } from "@components"
import { Color } from "@styles"
import React from "react"
import { InputElement, InputLabel, InputMessage } from "./input.styled"

interface InputProps {
  label?: string
  value?: string
  placeholder?: string
  errorMessage?: string
  autoFocus?: boolean
  type?: "text" | "password"
  mandatory?: boolean
  onChange?(value: string): void
  onEnter?(event: React.KeyboardEvent<HTMLInputElement>): void
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  placeholder,
  errorMessage,
  autoFocus = false,
  type = "text",
  mandatory = false,
  onChange,
  onEnter,
}) => {
  const classes = `input ${errorMessage && "input--error"} `

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") onEnter?.(event)
  }

  return (
    <Grid direction="column" spacing={1}>
      {label && (
        <GridItem>
          <InputLabel variant="p" weight="extrabold">
            {label} {mandatory && "*"}
          </InputLabel>
        </GridItem>
      )}

      <GridItem col={12}>
        <InputElement
          className={classes}
          value={value}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onChange={(e) => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          type={type}
        />
      </GridItem>

      {errorMessage && (
        <InputMessage>
          <GridItem>
            <Typography weight="bold" variant="small" color={Color.Error2}>
              {errorMessage}
            </Typography>
          </GridItem>
        </InputMessage>
      )}
    </Grid>
  )
}
