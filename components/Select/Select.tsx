import React, { cloneElement, useEffect, useRef, useState } from "react"
import { ChevronDown } from "react-feather"
import { Variant } from "../Button/Button"
import { IconType } from "../Icon/Icon"
import { SelectButton, SelectList, SelectWrapper } from "./select.styled"
import { SelectItemProps } from "./SelectItem"

type Selected = {
  value: string | number
  label: string
}

interface SelectProps {
  children:
    | React.ReactElement<SelectItemProps>[]
    | React.ReactElement<SelectItemProps>
  icon?: IconType
  placeholder?: string
  showArrow?: boolean
  variant?: Variant
  listVariant?: Variant
  width?: number
  type?: "button" | "select"
  disabled?: boolean
}

export const Select: React.FC<SelectProps> = ({
  icon,
  placeholder,
  showArrow = true,
  variant = "terciary",
  listVariant = "transparent-secondary",
  width,
  type = "select",
  disabled,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Selected>()

  useEffect(() => {
    React.Children.map(
      children,
      (child: React.ReactElement<SelectItemProps>) => {
        if (child.props.selected) {
          setSelected({ value: child.props.value, label: child.props.label })
        }
      }
    )
  }, [children])

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
        rightIcon={showArrow ? ChevronDown : undefined}
        disabled={disabled}
      />

      <SelectList hidden={!open}>
        {React.Children.map(
          children,
          (child: React.ReactElement<SelectItemProps>) => {
            const selectedChild =
              type === "select" &&
              selected &&
              child.props.value === selected.value

            const clickEvent = (e: React.MouseEvent) => {
              if (type === "select") {
                setSelected({
                  value: child.props.value,
                  label: child.props.label,
                })
                setOpen(false)
              }
            }

            return cloneElement(child, {
              selected: selectedChild,
              variant: listVariant,
              onClick: clickEvent,
            })
          }
        )}
      </SelectList>
    </SelectWrapper>
  )
}
