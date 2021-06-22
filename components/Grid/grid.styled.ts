import styled from "styled-components"

export const GridItemContainer = styled.div<{
  align: string
  justify: string
  col: number | undefined
}>`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  width: ${(props) => (props.col ? `${(props.col / 12) * 100}%` : "auto")};
`

export const GridContainer = styled.div<{
  align: string
  justify: string
  spacing: number
  height: number | string | undefined
}>`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  width: 100%;
  height: ${(props) => props.height || "auto"};

  &.grid {
    &--row {
      flex-direction: row;

      & > ${GridItemContainer} + ${GridItemContainer} {
        margin-left: ${(props) => `${props.spacing * 8}px`};
      }
    }

    &--column {
      flex-direction: column;

      & > ${GridItemContainer} + ${GridItemContainer} {
        margin-top: ${(props) => `${props.spacing * 8}px`};
      }
    }
  }
`
