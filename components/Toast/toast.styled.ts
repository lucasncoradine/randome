import styled from "styled-components"
import { boxShadow3, Color } from "../../styles/vars.styled"
import { lighten } from "polished"

export const ToastContainer = styled.div<{ show: boolean }>`
  position: absolute;
  right: ${(props) => (props.show ? "30px" : "0")};
  opacity: ${(props) => (props.show ? 1 : 0)};
  bottom: 30px;
  box-shadow: ${boxShadow3};
  padding: 16px 24px 16px 16px;
  border-radius: 12px;
  z-index: 999;
  transition: all 200ms cubic-bezier(0, 0, 0.2, 1);
  box-sizing: border-box;

  &.toast {
    &--info {
      background-color: ${lighten(0.2, Color.Support)};
      color: ${Color.Success3};
    }

    &--success {
      background-color: ${lighten(0.25, Color.Success)};
      color: ${Color.Success3};
    }

    &--error {
      background-color: ${lighten(0.2, Color.Error)};
      color: ${Color.Error3};
    }
  }
`
