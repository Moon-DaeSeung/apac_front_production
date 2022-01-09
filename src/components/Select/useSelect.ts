import { Placement } from '@popperjs/core'
import React, { useCallback, useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { isEqual, debounce } from '../../libs/utils'
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
  const [menuEl, setMenuEl] = useState<HTMLDivElement | null>(null)
  const [selectEl, setSelectEl] = useState<HTMLElement | null>(null)
  const [options, setOptions] = useState(optionsProp)
  const [inputValue, setInputValue] = useState(multiple ? '' : getOptionLabel(value))
  const [focusedOption, setFocusedOption] = useState<any | null>(multiple ? null : value)
  const isFocused = (option: any) => isEqual(option, focusedOption)
  const isSelected = (option: any) => {
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
        !menuEl?.contains(event.target) &&
            !menuEl?.parentElement?.contains(event.target) &&
            !selectEl?.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [menuEl, selectEl])

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
    selectOption(option)
    if (!multiple) setIsMenuOpen(false)
  }

  const handleKeyDown = (event: any) => {
    switch (event.key) {
      case 'ArrowUp':
        if (!isMenuOpen) { setIsMenuOpen(true); return }
        event.preventDefault()
        getFocusedOption('up')
        break
      case 'ArrowDown':
        if (!isMenuOpen) { setIsMenuOpen(true); return }
        event.preventDefault()
        getFocusedOption('down')
        break
      case 'Enter':
        if (!isMenuOpen) { setIsMenuOpen(true); return }
        if (!focusedOption) return
        selectOption(focusedOption)
        if (!multiple) setIsMenuOpen(false)
        break
      case 'Tab':
        setIsMenuOpen(false)
        break
      case 'Escape':
        setIsMenuOpen(false)
        break
    }
  }

  const reset = () => {
    setOptions(optionsProp)
    multiple || onChange(null)
  }

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }

  const filterMenu = useCallback(debounce((searchString: string) => {
    const searchedOptions = optionsProp.filter(option => getOptionLabel(option).includes(searchString))
    searchString && setOptions(searchedOptions)
  }, 200), [])

  useEffect(() => {
    filterMenu(inputValue)
  }, [inputValue])

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
      const filtered = (value as any[]).filter(item => !isEqual(item, option))
      filtered.length === (value as any[]).length ? onChange([...value, option]) : onChange(filtered)
    } else {
      onChange(option)
    }
  }

  useEffect(() => {
    if (isMenuOpen) return
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
    isSelected,
    isFocused,
    setFocusedOption,
    handleEraseValue,
    setSelectEl,
    styles,
    attributes,
    setIsMenuOpen
  }
}
