import {
  ButtonVariant,
  IconType,
  SelectItem,
  SelectItemProps,
} from "@components"
import React, { cloneElement, useEffect, useRef, useState } from "react"
import { ChevronDown } from "react-feather"
import { SelectButton, SelectList, SelectWrapper } from "./select.styled"

type Selected = {
  value: string | number
  label: string
}

interface SelectProps {
  icon?: IconType
  placeholder?: string
  hideArrow?: boolean
  variant?: ButtonVariant
  listVariant?: ButtonVariant
  width?: number
  type?: "button" | "select"
  disabled?: boolean
  onChange?(value: Selected): void
}

export const Select: React.FC<SelectProps> = ({
  icon,
  placeholder,
  hideArrow = false,
  variant = "terciary",
  listVariant = "normal",
  width,
  disabled,
  onChange,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Selected>()

  useEffect(() => {
    React.Children.map(children, (child) => {
      if (child) {
        const element = child as React.ReactElement<SelectItemProps>

        if (element.props.selected) {
          setSelected({
            value: element.props.value,
            label: element.props.label,
          })
        }
      }
    })
  }, [children])

  useEffect(() => {
    if (selected) onChange?.(selected)
  }, [selected])

  const handleBlur = (e: MouseEvent) => {
    if (open && !wrapperRef.current?.contains(e.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    if (open) {
      wrapperRef.current?.focus()
      window.addEventListener("click", handleBlur)
    } else {
      window.removeEventListener("click", handleBlur)
    }
  }, [open])

  return (
    <SelectWrapper width={width} tabIndex={0} ref={wrapperRef}>
      <SelectButton
        variant={variant}
        onClick={() => setOpen(!open)}
        label={selected?.label || placeholder}
        leftIcon={icon}
        rightIcon={!hideArrow ? ChevronDown : undefined}
        disabled={disabled}
      />

      <SelectList hidden={!open}>
        {React.Children.map(children, (child) => {
          if (child) {
            const element = child as React.ReactElement<SelectItemProps>

            const selectedChild =
              selected && element.props.value === selected.value

            const clickEvent = () => {
              if (element.type === SelectItem) {
                setSelected({
                  value: element.props.value,
                  label: element.props.label,
                })
                setOpen(false)
              } else {
                element.props.onClick?.()
              }
            }

            return cloneElement(element, {
              className: selectedChild ? "selected" : "",
              selected: selectedChild,
              variant: element.props.variant || listVariant,
              onClick: clickEvent,
            })
          }
        })}
      </SelectList>
    </SelectWrapper>
  )
}
