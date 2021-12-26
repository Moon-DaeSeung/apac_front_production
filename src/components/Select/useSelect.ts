import { Placement } from '@popperjs/core'
import React, { useEffect, useState } from 'react'
import { usePopper } from 'react-popper'
import { isEqual } from '../../utils/isEqual'
import { getScrollParent, invokeScroll, scrollResolver } from './scrollUtils'

interface UseSelectProps<T> {
  value: null | T,
  options: any[],
  onChange: (value: null | T) => void
  getOptionLabel: (value: T | null) => string,
  selectRef: React.RefObject<HTMLDivElement>,
  inputRef: React.RefObject<HTMLInputElement>
}

export function useSelect<T> ({ value, options: optionsProp, getOptionLabel, onChange, selectRef, inputRef }: UseSelectProps<T>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuEl, setMenuEl] = useState<HTMLDivElement | null>(null)
  const [options, setOptions] = useState(optionsProp)
  const [inputValue, setInputValue] = useState(getOptionLabel(value))
  const [focusedOption, setFocusedOption] = useState<any | null>(value)
  const isFocused = (option: any) => isEqual(option, focusedOption)
  const isSelected = (option: any) => isEqual(value, option)
  const [mainEl, setMainEl] = useState<HTMLElement | null>(null)
  const placement: Placement = 'bottom'
  const { styles, attributes } = usePopper(mainEl, menuEl, {
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

  const addOutsideClickEventListenerEffect = () => {
    useEffect(() => {
      const checkIfClickedOutside = (event: any) => {
        if (
          isMenuOpen &&
          menuEl &&
          !menuEl.contains(event.target) &&
          !menuEl.parentElement?.contains(event.target) &&
          !mainEl?.contains(event.target)
        ) {
          event.preventDefault()
          setIsMenuOpen(false)
        }
      }

      document.addEventListener('mousedown', checkIfClickedOutside)
      if (!isMenuOpen) return document.removeEventListener('mousedown', checkIfClickedOutside)

      return () => {
        document.removeEventListener('mousedown', checkIfClickedOutside)
      }
    }, [menuEl])
  }

  const focusInputOnMenuOpenEffect = () => useEffect(() => {
    isMenuOpen && setFocusedOption(value)
    isMenuOpen && inputRef.current?.focus()
  }, [isMenuOpen])

  const syncFocusedOptionEffect = () => useEffect(() => {
    setInputValue(value !== null ? getOptionLabel(value) : '')
    setFocusedOption(value)
  }, [value])

  const scrollOnFocusOptionEffect = () => {
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
  }

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
    setFocusedOption(option)
    setIsMenuOpen(false)
  }

  const handleKeyDown = (event: any) => {
    // event.preventDefault()
    switch (event.key) {
      case 'ArrowUp':
        if (!isMenuOpen) break
        getFocusedOption('up')
        break
      case 'ArrowDown':
        if (!isMenuOpen) setIsMenuOpen(true)
        getFocusedOption('down')
        break
      case 'Enter':
        if (!isMenuOpen) break
        setIsMenuOpen(false)
        break
      case 'Tab':
        if (!isMenuOpen) break
        setIsMenuOpen(false)
        break
    }
  }

  const reset = () => {
    setOptions(optionsProp)
    onChange(null)
  }

  const handleInputChange = (event: any) => {
    const searchString = event.target.value
    setInputValue(searchString)
    const searchedOptions = optionsProp.filter(option => getOptionLabel(option).includes(searchString))
    searchString && setOptions(searchedOptions)
  }

  const handleEraseValue = () => {
    onChange(null)
    setInputValue('')
    setIsMenuOpen(false)
  }

  const resetOnInputValueBlankEffect = () => useEffect(() => {
    inputValue === '' && reset()
  }, [inputValue])

  const defocusOnOptionsChangeEffect = () => useEffect(() => {
    setFocusedOption(null)
  }, [options])

  const registerWheelEventEffect = () => useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const option = e.deltaY > 0 ? getFocusedOption('down') : getFocusedOption('up')
      onChange(option)
    }
    const selectEl = selectRef.current
    if (selectEl === null) return
    selectEl.addEventListener('wheel', handleWheel, { passive: false })

    return () => selectEl.removeEventListener('wheel', handleWheel)
  }, [focusedOption, options])

  const syncValueOnModalClosedEffect = () => useEffect(() => {
    if (isMenuOpen) return
    if (focusedOption !== null) { onChange(focusedOption); return }
    const option = optionsProp.find((option) => getOptionLabel(option) === inputValue)
    option ? onChange(option) : setInputValue(''); onChange(null)
  }, [isMenuOpen])

  return {
    syncFocusedOptionEffect,
    focusInputOnMenuOpenEffect,
    scrollOnFocusOptionEffect,
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
    registerWheelEventEffect,
    resetOnInputValueBlankEffect,
    defocusOnOptionsChangeEffect,
    syncValueOnModalClosedEffect,
    setMainEl,
    styles,
    attributes,
    setIsMenuOpen,
    addOutsideClickEventListenerEffect
  }
}
