import React from "react"
import { GridItem } from ".."
import { LoaderContainer, LoaderRipple, LoaderWrapper } from "./loader.styled"
import Image from "next/image"

interface LoaderProps {
  show?: boolean
  fullscreen?: boolean
}

export const Loader: React.FC<LoaderProps> = ({
  show = true,
  fullscreen = false,
}) => {
  return (
    <LoaderWrapper
      alignItems="center"
      justifyContent="center"
      direction="column"
      spacing={2}
      hidden={!show}
      fullscreen={fullscreen}
    >
      <GridItem>
        <Image src="/logo.svg" width={200} height={100} />
      </GridItem>

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
