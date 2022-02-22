import { Typography } from "components/Typography/Typography"
import styled from "styled-components"
import { boxShadow2 } from "../../styles/vars.styled"

export const CardItemContainer = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 10px 16px;
  color: black;
  box-shadow: ${boxShadow2};
`

export const CardInfo = styled(Typography)`
  margin-right: 4em;
`
