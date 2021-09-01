import styled from "styled-components"
import { Color } from "@styles"
import { GridItem } from "@components"

export const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  min-width: 200px;
  min-height: 100px;
  background-color: ${Color.Background2};
  color: ${Color.Support3};
  border-radius: 32px;
`

export const AlertIcon = styled(GridItem)`
  margin-right: 20px;
`
