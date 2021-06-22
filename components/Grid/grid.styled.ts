import styled from "styled-components"

export const GridContainer = styled.div<{
  align: string
  justify: string
}>`
  .grid {
    display: flex;
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.align};
    width: 100%;

    &--row {
      flex-direction: row;
    }

    &--column {
      flex-direction: column;
    }
  }
`

export const GridItemContainer = styled.div<{
  align: string
  justify: string
  col: number | undefined
}>`
  display: flex;
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  width: ${(props) => (props.col ? `${(props.col / 12) * 100}px` : "100%")};
`
