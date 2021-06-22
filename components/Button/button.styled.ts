import styled from "styled-components"
import { Color } from "../../styles/vars.styled"

export const ButtonElement = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease-in-out;

  .buttonIcon {
    & ~ .buttonLabel {
      margin-left: 8px;
    }
  }

  &.size {
    &--normal {
      padding: 10px 20px;
      height: 40px;
      border-radius: 16px;
    }

    &--large {
      height: 72px;
      border-radius: 28px;
      padding: 8px 35px;
    }
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

    &--transparent {
      background-color: transparent;
      color: ${Color.Primary};

      &:hover {
        background-color: ${Color.GrayLight};
      }
    }

    &--icon {
      padding: 10px;
    }

    &:disabled {
      opacity: 0.25;
      pointer-events: none;
      cursor: not-allowed;
    }
  }
`

export const LinkButtonElement = styled.a<{ color: string | undefined }>`
  display: inline-flex;
  background-color: transparent;
  color: ${(props) => props.color || Color.Secondary};
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`
