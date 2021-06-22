import styled from "styled-components"
import { Color } from "../../styles/vars.styled"

export const ButtonElement = styled.button`
  border-radius: 16px;
  outline: none;
  border: none;
  padding: 5px 15px;
  min-width: 120px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease-in-out;

  .buttonIcon {
    margin-right: 8px;
  }

  &.button {
    &--primary {
      background-color: ${Color.Primary};
      color: ${Color.White};

      &:hover {
        background-color: ${Color.Primary2};
      }
    }

    &--secondary {
      background-color: ${Color.Secondary};
      color: ${Color.White};

      &:hover {
        background-color: ${Color.Secondary2};
      }
    }

    &--link {
      background-color: transparent;
      color: ${Color.Secondary};

      &:hover {
        text-decoration: underline;
      }
    }

    &--transparent {
      background-color: transparent;
      color: ${Color.Black};

      &:hover {
        background-color: ${Color.GrayLight};
        color: ${Color.Secondary};
      }
    }

    &:disabled {
      opacity: 0.25;
      pointer-events: none;
      cursor: not-allowed;
    }
  }
`
