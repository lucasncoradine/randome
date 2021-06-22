import React, { useEffect, useState } from "react"
import { Typography } from ".."
import { TypographyProps } from "./Typography"

export interface TypewriterProps extends TypographyProps {
  string: string
  delay?: number
  stopBlinkinOnComplete?: any
  className?: string
  onComplete?: () => void
  cursor?: string
  cursorClassName?: string
  staticText?: boolean
}

export const Typewriter = ({
  string,
  delay = 50,
  stopBlinkinOnComplete = false,
  className,
  onComplete = () => {},
  cursor = "|",
  cursorClassName = undefined,
  staticText = false,
  ...typographyProps
}: TypewriterProps) => {
  const [text, setText] = useState("")
  const [auxText, setAuxText] = useState("")
  const [pointer, setPointer] = useState(-1)

  useEffect(() => {
    setAuxText("")
  }, [string])

  useEffect(() => {
    if (staticText) {
      setText(string)
    } else {
      if (pointer < string.length) {
        setTimeout(() => {
          setText(auxText + string.charAt(pointer))
          setAuxText(auxText + string.charAt(pointer))
          setPointer(pointer + 1)
        }, delay)
      } else {
        onComplete()
      }
    }
  }, [staticText, pointer])

  return <Typography {...typographyProps}>{text}</Typography>
}
