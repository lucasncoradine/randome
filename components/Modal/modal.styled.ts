import { rgba } from "polished"
import styled, { keyframes } from "styled-components"
import { Grid, GridItem } from "@components"
import { boxShadow3, Color } from "@styles"

const ModalAnimationOpen = keyframes`
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1);
  }
`

export const ModalContainer = styled(Grid)`
  min-height: 250px;
  max-height: 80vh;
  background-color: ${Color.White};
  box-shadow: ${boxShadow3};
  border-radius: 36px;
  padding: 30px;
  overflow: hidden;
  position: relative;

  &.modal {
    &--sm {
      width: 450px;
      min-height: 100px;
      padding: 16px;
    }

    &--md {
      width: 550px;
    }

    &--lg {
      width: 704px;
    }
  }
`

export const ModalWrapper = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  opacity: ${(props) => (props.open ? 1 : 0)};
  pointer-events: ${(props) => (props.open ? "all" : "none")};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 990;
  color: ${Color.Black};
  background: ${rgba(Color.Gray, 0.5)};
  backdrop-filter: blur(2px);

  &[open] {
    & ${ModalContainer} {
      animation: ${ModalAnimationOpen} 350ms cubic-bezier(0, 0, 0.2, 1);
    }
  }
`

export const ModalTitle = styled(GridItem)`
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid ${Color.GrayLight};
`

export const ModalBody = styled(GridItem)`
  width: 100%;
  padding: 24px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${Color.GrayLight};
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.Gray};
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${Color.Gray2};
  }
`
