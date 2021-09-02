import { Button, ButtonProps } from "@components"
import React, { useRef } from "react"
import { FileInput, FileUploaderWrapper } from "./fileuploader.styled"

interface FileUploaderProps extends ButtonProps {
  acceptedExtensions?: string[]
  onDataLoad?(files: File[]): void
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onDataLoad,
  acceptedExtensions = ".*",
  ...buttonProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const extensions = Array.from(acceptedExtensions).join(",")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files)
      onDataLoad?.(files)
    }
  }

  return (
    <FileUploaderWrapper>
      <Button {...buttonProps} onClick={() => inputRef.current?.click()} />
      <FileInput
        ref={inputRef}
        hidden
        type="file"
        accept={extensions}
        onChange={handleFileChange}
        multiple
      />
    </FileUploaderWrapper>
  )
}
