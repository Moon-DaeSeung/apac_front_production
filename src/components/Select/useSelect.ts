import { Placement } from '@popperjs/core'
import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { isEqual } from '../../utils/isEqual'
import { getScrollParent, invokeScroll, scrollResolver } from './scrollUtils'

interface UseSelectProps<T> {
  value: any
  options: any[],
  onChange: (value: any) => void
  getOptionLabel: (value: T | null) => string,
  inputRef: React.RefObject<HTMLInputElement>,
  multiple?: boolean
}

export function useSelect<T> ({ multiple, value, options: optionsProp, getOptionLabel, onChange, inputRef }: UseSelectProps<T>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [menuEl, setMenuEl] = useState<HTMLDivElement | null>(null)
  const [selectEl, setSelectEl] = useState<HTMLElement | null>(null)
  const [options, setOptions] = useState(optionsProp)
  const [inputValue, setInputValue] = useState(multiple ? '' : getOptionLabel(value))
  const [focusedOption, setFocusedOption] = useState<any | null>(multiple ? null : value)
  const isFocusedOption = (option: any) => isEqual(option, focusedOption)
  const isSelectedOption = (option: any) => {
    let result: boolean
    if (multiple) {
      result = (value as any[]).findIndex((item) => isEqual(item, option)) !== -1
    } else {
      result = isEqual(value, option)
    }
    return result
  }
  const placement: Placement = 'bottom'
  const { styles, attributes } = usePopper(selectEl, menuEl, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10]
        }
      }
    ]
  })

  useEffect(() => {
    const checkIfClickedOutside = (event: any) => {
      if (
        isMenuOpen &&
        menuEl &&
        !menuEl.contains(event.target) &&
        !menuEl.parentElement?.contains(event.target) &&
        !selectEl?.contains(event.target)
      ) {
        event.preventDefault()
        setIsMenuOpen(false)
        setIsFocused(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    if (!isMenuOpen) return document.removeEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [menuEl])

  useEffect(() => {
    (!multiple && isMenuOpen) && setFocusedOption(value)
    isMenuOpen && inputRef.current?.focus()
  }, [isMenuOpen])

  useEffect(() => {
    if (multiple) {
      setInputValue('')
    } else {
      setInputValue(value !== null ? getOptionLabel(value) : '')
      setFocusedOption(value)
    }
    setIsMenuOpen(false)
  }, [value])

  useEffect(() => {
    const focusedOptionIndex = options.findIndex(option => isEqual(option, focusedOption))
    if (focusedOptionIndex === -1) return
    const optionEl = menuEl?.children[focusedOptionIndex] as HTMLDivElement
    if (!optionEl) return
    const { offsetTop, offsetHeight } = optionEl
    const scrollEl = getScrollParent(optionEl)
    const { scrollTop, viewHeight } = scrollResolver(scrollEl)
    const scrollUp = scrollTop - offsetTop
    const scrollDown = offsetTop + offsetHeight - (viewHeight + scrollTop)
    let move = 0
    if (scrollUp > 0) move = -scrollUp
    if (scrollDown > 0) move = scrollDown
    move !== 0 && invokeScroll({ scrollElement: scrollEl, move })
  }, [focusedOption])

  const getFocusedOption = (direction: 'up' | 'down') => {
    if (options.length === 0) return null
    const focusedOptionIndex = options.findIndex(option => isEqual(option, focusedOption))
    let nextFocusedOptionIndex: number
    if (focusedOptionIndex === -1) {
      nextFocusedOptionIndex = (direction === 'down' ? 0 : options.length - 1)
    } else {
      nextFocusedOptionIndex = (focusedOptionIndex + (direction === 'up' ? -1 : 1) + options.length) % options.length
    }
    const option = options[nextFocusedOptionIndex]
    setFocusedOption(option)
    return option
  }

  const handleOptionClick = (option: any) => {
    inputRef.current?.focus()
    selectOption(option)
  }

  const handleKeyDown = (event: any) => {
    if (!isMenuOpen) {
      setIsMenuOpen(true)
      return
    }

    switch (event.key) {
      case 'ArrowUp':
        getFocusedOption('up')
        break
      case 'ArrowDown':
        getFocusedOption('down')
        break
      case 'Enter':
        if (!focusedOption) return
        selectOption(focusedOption)
        break
      case 'Tab':
        setIsMenuOpen(false)
        setIsFocused(false)
        break
    }
  }

  const reset = () => {
    setOptions(optionsProp)
    multiple || onChange(null)
  }

  const handleInputChange = (event: any) => {
    const searchString = event.target.value
    setInputValue(searchString)
    const searchedOptions = optionsProp.filter(option => getOptionLabel(option).includes(searchString))
    searchString && setOptions(searchedOptions)
  }

  const handleEraseValue = () => {
    multiple || onChange(null)
    setInputValue('')
    setIsMenuOpen(false)
  }

  useEffect(() => {
    inputValue === '' && reset()
  }, [inputValue])

  useEffect(() => {
    setFocusedOption(null)
  }, [options])

  useEffect(() => {
    if (multiple) return
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const option = e.deltaY > 0 ? getFocusedOption('down') : getFocusedOption('up')
      onChange(option)
    }
    if (selectEl === null) return
    selectEl.addEventListener('wheel', handleWheel, { passive: false })

    return () => selectEl.removeEventListener('wheel', handleWheel)
  }, [focusedOption, options])

  const selectOption = (option: any) => {
    if (multiple) {
      const filtered = (value as any[]).filter(item => item !== option)
      filtered.length === (value as any[]).length ? onChange([...value, option]) : onChange(filtered)
    } else {
      onChange(option)
    }
  }

  useEffect(() => {
    if (isMenuOpen) { setIsFocused(true); return }
    multiple ? setInputValue('') : setInputValue(getOptionLabel(value))
  }, [isMenuOpen])

  return {
    inputValue,
    handleInputChange,
    handleKeyDown,
    handleOptionClick,
    setMenuEl,
    isMenuOpen,
    options,
    isSelectedOption,
    isFocusedOption,
    setFocusedOption,
    handleEraseValue,
    setSelectEl,
    styles,
    attributes,
    setIsMenuOpen,
    isFocused
  }
}
