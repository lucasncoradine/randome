import styled from "styled-components"
import { boxShadow2, Color } from "../../styles/vars.styled"
import { Typography } from "../Typography/Typography"

export const InputElement = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid ${Color.Gray};
  border-radius: 12px;
  outline: none;
  color: ${Color.Black};
  margin-bottom: 4px;
  font-weight: 600;
  width: 100%;

  &:focus {
    border-color: ${Color.Secondary};
    box-shadow: ${boxShadow2};
  }

  &::placeholder {
    color: ${Color.Gray};
    font-weight: normal;
  }

  &.input {
    &--error {
      color: ${Color.Error2};
      border-color: ${Color.Error2};
    }
  }
`

export const InputMessage = styled.div`
  margin-left: 8px;
`

export const InputLabel = styled(Typography)`
  margin-left: 4px;
`
