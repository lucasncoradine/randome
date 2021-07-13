import styled from "styled-components"
import { Color } from "../../styles/vars.styled"
import { darken } from "polished"

export const ButtonElement = styled.button<{ scale?: boolean }>`
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms cubic-bezier(0.2, 0.5, 0.5, 1),
    transform 300ms;

  &:hover {
    transform: ${(props) => (props.scale ? "scale(1.03)" : "none")};
  }

  .buttonIcon {
    &--left {
      & ~ .buttonLabel {
        margin-left: 8px;
      }
    }

    &--right {
      & ~ .buttonLabel {
        margin-right: 8px;
      }
    }
  }

  &.button {
    &--primary {
      background-color: ${Color.Primary};
      color: ${Color.White};

      &:hover {
        background-color: ${darken(0.05, Color.Primary)};
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

    &--transparent-secondary {
      background-color: transparent;
      color: ${Color.Secondary};

      &:hover {
        background-color: ${Color.GrayLight};
      }
    }

    &--terciary {
      background-color: ${Color.GrayLight};
      color: ${Color.Black};

      &:hover {
        background-color: ${darken(0.05, Color.GrayLight)};
      }
    }

    &--normal {
      background-color: transparent;
      color: ${Color.Black};

      &:hover {
        background-color: ${Color.GrayLight};
      }
    }

    &--icon {
      padding: 10px;
    }
  }

  &:disabled {
    opacity: 0.25;
    pointer-events: none;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.size {
    &--normal {
      padding: 16px;
      height: 48px;
      border-radius: 16px;
    }

    &--large {
      height: 72px;
      border-radius: 28px;
      padding: 8px 35px;
    }

    &--small {
      border-radius: 12px;
      padding: 8px;
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
