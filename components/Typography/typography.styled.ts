import styled from "styled-components"

export const TypographyElement = styled.span<{
  color: string
  textAlign: string
}>`
  color: ${(props) => props.color};
  margin: 0;
  font-weight: 400;
  text-align: ${(props) => props.textAlign};

  &.typography {
    &--h1 {
      font-size: 48px;
      font-weight: 800;
    }

    &--h2 {
      font-size: 38px;
      font-weight: 800;
    }

    &--h3 {
      font-size: 28px;
      font-weight: 600;
    }

    &--h4 {
      font-size: 20px;
      font-weight: 600;
    }

    &--p {
      font-size: 16px;
    }

    &--small {
      font-size: 12px;
    }
  }

  &.weight {
    &--bold {
      font-weight: 600;
    }

    &--extrabold {
      font-weight: 800;
    }
  }
`
