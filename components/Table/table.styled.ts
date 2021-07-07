import styled from "styled-components"
import { Color } from "../../styles/vars.styled"

export const TableBody = styled.tbody``

export const Row = styled.tr`
  &:hover {
    background-color: ${Color.Support};
  }
`

export const HeadCell = styled.th<{ textAlign?: string }>`
  padding: 16px 10px;
  text-align: ${(props) => props.textAlign || "left"};
`

export const TableHead = styled.thead`
  background-color: ${Color.White};
  box-shadow: 0 3px 2px rgba(178, 186, 188, 0.3);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  & ${Row} {
    background-color: transparent;
  }

  & ${HeadCell}:first-child {
    border-top-left-radius: 12px;
  }

  & ${HeadCell}:last-child {
    border-top-right-radius: 12px;
  }
`

export const Cell = styled.td<{ textAlign?: string }>`
  padding: 14px 10px;
  text-align: ${(props) => props.textAlign || "left"};
`

export const TableElement = styled.table`
  width: 100%;
  border-collapse: separate;
  border-radius: 12px;
  table-layout: fixed;
  background-color: ${Color.Background2};
  box-shadow: 0 0px 2px rgba(178, 186, 188, 0.2);

  & ${Row}:nth-child(even) {
    background-color: ${Color.White};

    &:hover {
      background-color: ${Color.Support};
    }
  }

  & ${Row}:first-child {
    & ${Cell} {
      &:first-child {
        border-top-left-radius: 12px;
      }

      &:last-child {
        border-top-right-radius: 12px;
      }
    }
  }

  & ${Row}:last-child {
    & ${Cell} {
      &:first-child {
        border-bottom-left-radius: 12px;
      }

      &:last-child {
        border-bottom-right-radius: 12px;
      }
    }
  }
`
