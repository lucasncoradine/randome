import { rgba } from "polished"
import styled, { keyframes } from "styled-components"
import { Grid } from ".."
import { Color } from "../../styles/vars.styled"

const AnimationLoader = keyframes`
  0% {
    top: 96px;
    left: 96px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 58px;
    left: 58px;
    width: 76px;
    height: 76px;
    opacity: 0;
  }
`

export const LoaderWrapper = styled(Grid)<{
  hidden: boolean
  hideBackground: boolean
}>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 991;
  opacity: ${(props) => (props.hidden ? "0" : "1")};
  pointer-events: ${(props) => (props.hidden ? "none" : "all")};
  transition: opacity 500ms ease-in-out;
  backdrop-filter: blur(1px);
  background-color: ${(props) =>
    props.hideBackground ? Color.White : rgba(Color.GrayLight, 0.5)};
`

export const LoaderContainer = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
`

export const LoaderRipple = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;

  & div {
    position: absolute;
    border-width: 4px;
    border-style: solid;
    opacity: 1;
    border-radius: 50%;
    box-sizing: content-box;
    animation: ${AnimationLoader} 1s cubic-bezier(0.2, 0.5, 0.5, 1) infinite;

    &:nth-child(1) {
      border-color: ${Color.Primary};
      animation-delay: 0s;
    }

    &:nth-child(2) {
      border-color: ${Color.Secondary};
      animation-delay: -0.6756756756756757s;
    }
  }
`
