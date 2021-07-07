import styled, { keyframes } from "styled-components"
import { GridItem, Typography } from "../../components"

const upAndDown = keyframes`
  0% {
    transform: translateY(0)
  }
  50% {
    transform: translateY(16px);
  }

  100% {
    transform: translateY(0);
  }
`

export const AnimatedEmoji = styled(Typography)<{ animated: boolean }>`
  animation: ${upAndDown} 1.5s linear infinite;
  animation: ${(props) => props.animated === false && "none"};
`

export const Footer = styled(GridItem)`
  padding-top: 8rem;
`

export const TitleContainer = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
`
