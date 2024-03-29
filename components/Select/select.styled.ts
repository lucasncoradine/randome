import { darken } from "polished"
import styled from "styled-components"
import { boxShadow2, Color } from "../../styles/vars.styled"
import { Button } from "../Button/Button"
import { ButtonElement } from "../Button/button.styled"

export const SelectWrapper = styled.div<{ width?: number }>`
  display: flex;
  position: relative;
  justify-content: center;
  min-width: ${(props) => `${props.width}px` || "100%"};
  width: max-content;
`

export const SelectButton = styled(Button)`
  width: 100%;
  justify-content: space-between;
`

export const SelectList = styled.div`
  padding: 10px;
  position: absolute;
  top: 100%;
  width: max-content;
  min-width: 100%;
  margin-top: 8px;
  background-color: ${Color.White};
  box-shadow: ${boxShadow2};
  border-radius: 24px;

  & ${ButtonElement} {
    width: 100%;
    justify-content: flex-start;

    &.selected {
      background-color: ${Color.GrayLight};

      &:hover {
        background-color: ${darken(0.05, Color.GrayLight)};
      }
    }

    & + ${ButtonElement} {
      margin-top: 8px;
    }
  }
`

export const SelectItemWrapper = styled.div``
