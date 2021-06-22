import styled from "styled-components"

export const TypographyElement = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  margin: 0;

  &.typography {
    &--h1 {
      font-size: 64px;
      font-weight: 800;
    }

    &--h2 {
      font-size: 48px;
      font-weight: 800;
    }

    &--h3 {
      font-size: 38px;
      font-weight: 600;
    }

    &--h3 {
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
    &--regular {
      font-weight: 400;
    }

    &--bold {
      font-weight: 600;
    }

    &--extrabold {
      font-weight: 800;
    }
  }
`
