import React from "react"
import {
  Cell,
  HeadCell,
  Row,
  TableBody,
  TableElement,
  TableHead,
} from "./table.styled"

export interface TableColumn {
  header?: string
  field: string
  align?: "right" | "left"
}

interface TableProps {
  columns: TableColumn[]
  data: any[]
  hideRowHeader?: boolean
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  hideRowHeader = false,
}) => {
  const renderBody = () =>
    data.map((item, index) => (
      <Row key={index}>
        {columns.map((col) => (
          <Cell key={index}>{item[col.field]}</Cell>
        ))}
      </Row>
    ))

  return (
    <TableElement cellSpacing={0}>
      {!hideRowHeader && (
        <TableHead>
          <Row>
            {columns.map((col) => (
              <HeadCell key={col.field}>{col.header || ""}</HeadCell>
            ))}
          </Row>
        </TableHead>
      )}

      <TableBody>{renderBody()}</TableBody>
    </TableElement>
  )
}
