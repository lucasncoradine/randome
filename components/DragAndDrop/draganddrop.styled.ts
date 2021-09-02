import { Color } from "@styles"
import styled from "styled-components"
import { rgba } from "polished"

export const DragAndDropWrapper = styled.div<{ hightlighted: boolean }>`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 36px;
  position: absolute;
  transition: background-color 0.15s ease-out;

  ${(props) =>
    props.hightlighted &&
    `
      backdrop-filter: blur(2px); 
      z-index: 2;
      border: 3px dashed ${Color.Secondary3};
      background-color: ${rgba(Color.Secondary, 0.1)};
    `}
`

export const DropLabel = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`
