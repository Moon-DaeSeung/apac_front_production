import { css, SerializedStyles } from '@emotion/react'
import React, { CSSProperties, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import downArrowIcon from '../../images/down_arrow.svg'
import crossIcon from '../../images/cross.svg'
import { useSelect } from './useSelect'
import Portal from '../Portal'

// Redecalare forwardRef
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export interface SelectProps<T> {
  selectCss?: SerializedStyles | SerializedStyles[]
  constrollCss?: SerializedStyles | SerializedStyles[]
  menuCss?: SerializedStyles | SerializedStyles[]
  style?: CSSProperties
  options: T[]
  value: T | null
  onChange?: (value: T | null) => void
  getOptionLabel?: (option: T) => string
  name?: string,
  isAutoComplete?: boolean
  parentPortal?: HTMLElement | undefined | null
  deleteEraser?: boolean
}

function Select<T> ({
  style, menuCss, selectCss, name, constrollCss,
  value: controlledValue, onChange: setControlledValue,
  options: optionsProp, getOptionLabel: getOptionLabelProp,
  isAutoComplete = false, parentPortal, deleteEraser = false
}: SelectProps<T>, ref?: any) {
  const getOptionLabel = (value: T | null) => {
    if (value === null || value === undefined) return ''
    return getOptionLabelProp ? getOptionLabelProp(value) : (value as unknown as string).toString()
  }
  const selectRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef(null)
  const [unControlledValue, setUncontrolledValue] = useState<any | null>(null)
  useImperativeHandle(ref, () => inputRef.current)
  const value = controlledValue !== undefined ? controlledValue : unControlledValue
  const onChange = setControlledValue !== undefined ? setControlledValue : setUncontrolledValue

  const {
    setMenuEl,
    inputValue,
    handleInputChange,
    handleEraseValue,
    isMenuOpen,
    options,
    handleOptionClick,
    handleKeyDown,
    isFocused,
    isSelected,
    setFocusedOption,
    scrollOnFocusOptionEffect,
    syncFocusedOptionEffect,
    focusInputOnMenuOpenEffect,
    registerWheelEventEffect,
    resetOnInputValueBlankEffect,
    defocusOnOptionsChangeEffect,
    syncValueOnModalClosedEffect,
    addOutsideClickEventListenerEffect,
    setMainEl,
    styles,
    attributes,
    mainWidth,
    setIsMenuOpen
  } = useSelect({ value, options: optionsProp, getOptionLabel, onChange, selectRef, inputRef })

  scrollOnFocusOptionEffect()
  syncFocusedOptionEffect()
  focusInputOnMenuOpenEffect()
  registerWheelEventEffect()
  resetOnInputValueBlankEffect()
  defocusOnOptionsChangeEffect()
  syncValueOnModalClosedEffect()
  addOutsideClickEventListenerEffect()

  return (
    <>
      <div css={[select, selectCss]} style={style} ref={setMainEl} >
        <div css={[control, constrollCss]} ref={selectRef} onKeyDown={handleKeyDown} onFocus={() => setIsMenuOpen(true)} >
          <input
            css={[input, !isAutoComplete && css`&:focus { cursor: pointer};`, deleteEraser && css`text-align: center;`]}
            ref={inputRef}
            name={name}
            value={inputValue}
            readOnly={!isAutoComplete}
            onChange={handleInputChange}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {
            !deleteEraser &&
            <div
              css={[
                icon,
                inputValue ||
                css`
                display: none;
              `
              ]}
            >
              <img src={crossIcon} css={cross} onClick={handleEraseValue} />
            </div>
          }
          <div css={divider} />
          <div css={icon}>
            <img
              src={downArrowIcon}
              css={[arrow, isMenuOpen && up]}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </div>
      <Portal parentPortal={parentPortal}>
        {isMenuOpen &&
          <div
            css={[
              menu(mainWidth),
              isMenuOpen,
              menuCss
            ]}
            ref={setMenuEl}
            style={styles.popper} {...attributes.popper} >
            {options.length !== 0
              ? options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  css={[
                    menuItem,
                    isFocused(option) && focused,
                    isSelected(option) && selected
                  ]}
                  onClick={() => handleOptionClick(option)}
                  onMouseOver={() => setFocusedOption(option)}
                >
                  {getOptionLabel(option)}
                </div>
              ))
              : <div css={[menuItem]} style={{ justifyContent: 'center' }}>No options</div>
            }
          </div>
        }
      </Portal>
    </>
  )
}

export default forwardRef(Select)

const control = css`
  display: flex;
  place-items: center;
  height: 100%;
  border: solid 1px rgb(204, 204, 204);
  border-radius: inherit;
  font-size: 20px;
  color: #42515d;
  font-weight: bold;
  cursor: pointer;
  &:focus-within {
    box-shadow: 0px 0px 0px 1px rgb(38, 132, 255);
  }
`
const icon = css`
  height: 100%;
  aspect-ratio: 2 / 3;
  display: flex;
  place-items: center;
`
const divider = css`
  height: 60%;
  border-left: solid 1px rgb(204, 204, 204);
`
const arrow = css`
  display: flex;
  height: 100%;
  aspect-ratio: inherit;
  object-fit: cover;
`
const cross = css`
  aspect-ratio: inherit;
  height: 60%;
  margin-left: 10%;
`
const up = css`
  transform: rotate(180deg);
`
const input = css`
  width: 100%;
  height: 100%;
  border: none;
  background-color: white;
  border-radius: inherit;
  font-size: 16px;
  cursor: inherit;
  padding: 0px 10px;
  &:focus {
    outline: none;
    cursor: text;
  }
`
const select = css`
  width: 300px;
  height: 40px;
  border-radius: 4px;
  position: relative;
`
const menu = (width: number) => css`
  width: ${width}px;
  padding: 5px 0px;
  max-height: 200px;
  z-index: 1;
  overflow-y: scroll;
  position: relative;
  border-radius: inherit;
  box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
  cursor: pointer;
  background-color: white;
  top: 100%;
`
const menuItem = css`
  display: flex;
  align-items: center;
  height: 20px;
  padding: 5px;
`
const focused = css`
  background-color: lightblue;
`
const selected = css`
  background-color: rgb(38, 132, 255);
`
