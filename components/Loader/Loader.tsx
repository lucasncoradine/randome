import React from "react"
import { GridItem } from ".."
import { LoaderContainer, LoaderRipple, LoaderWrapper } from "./loader.styled"
import Image from "next/image"
import { Typography } from "../Typography/Typography"
import { useApp } from "../../contexts/AppContext"

interface LoaderProps {
  show?: boolean
  hideBackground?: boolean
  showLogo?: boolean
}

export const Loader: React.FC<LoaderProps> = ({
  show = true,
  hideBackground = false,
  showLogo = false,
}) => {
  return (
    <LoaderWrapper
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={1}
      hidden={!show}
      hideBackground={hideBackground}
    >
      {showLogo && (
        <GridItem>
          <Image src="/logo.svg" width={200} height={100} />
        </GridItem>
      )}

      <GridItem>
        <LoaderContainer>
          <LoaderRipple>
            <div></div>
            <div></div>
          </LoaderRipple>
        </LoaderContainer>
      </GridItem>
    </LoaderWrapper>
  )
}
