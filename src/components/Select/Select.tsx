import { css, SerializedStyles } from '@emotion/react'
import React, { CSSProperties, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import downArrowIcon from '../../images/down_arrow.svg'
import crossIcon from '../../images/cross.svg'
import { useSelect } from './useSelect'

// Redecalare forwardRef
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: P & React.RefAttributes<T>) => React.ReactElement | null;
}

export interface SelectProps {
  selectCss?: SerializedStyles | SerializedStyles[]
  constrollCss?: SerializedStyles | SerializedStyles[]
  style?: CSSProperties
  options: any[]
  value: any
  onChange?: (value: any) => void
  getOptionLabel?: (option: any) => string
  name?: string,
  autocomplete?: boolean
  deleteEraser?: boolean
  multiple?: boolean
}

function Select<T> ({
  style, selectCss, name, constrollCss,
  value: controlledValue, onChange: setControlledValue,
  options: optionsProp, getOptionLabel: getOptionLabelProp,
  autocomplete = false, deleteEraser = false, multiple = false
}: SelectProps, ref?: any) {
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
  const handleDelete = (e: any) => {
    e.preventDefault()
  }

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
      <div css={[select, selectCss]} style={style} ref={setMainEl}>
        <div
          css={[control, constrollCss]}
          ref={selectRef}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsMenuOpen(true)}
        >
          <div css={items}>
            {multiple && (value as any[]).map((option: any, key: number) => {
              return (
                <div key={key} css={item}>
                  <span css={itemName}>
                    {getOptionLabel(option)}
                  </span>
                  <button css={deleteItem} onClick={handleDelete}/>
                </div>
              )
            })}
          </div>
          <input
            css={[input, !autocomplete && css` &:focus { cursor: pointer;}`,
              deleteEraser && css`text-align: center;`
            ]}
            ref={inputRef}
            name={name}
            value={inputValue}
            readOnly={!autocomplete}
            onChange={handleInputChange}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {!deleteEraser && (
            <div
              css={[icon, inputValue || css`display: none;`]}
            >
              <img src={crossIcon} css={cross} onClick={handleEraseValue} />
            </div>
          )}
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
      {isMenuOpen && (
        <div
          css={[menu, isMenuOpen]}
          ref={setMenuEl}
          style={styles.popper}
          {...attributes.popper}
        >
          {options.length !== 0
            ? (
                options.map((option, optionIndex) => (
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
              )
            : (
            <div css={[menuItem]} style={{ justifyContent: 'center' }}>
              No options
            </div>
              )}
        </div>
      )}
      </div>
  )
}

export default forwardRef(Select)

const items = css`
  display: flex;
  align-items: center;
`
const item = css`
  display: flex;
  padding: 5px 10px;
  place-items: center;
  font-size: 0.8em;
  background-color: #EEEEEE;
  border-radius: 25px;
`
const itemName = css`
  font-size: 0.8em;
  flex-grow: 1;
  padding: 2px;
  text-align: center;
`
const deleteItem = css`
  border-radius: 50%;
  width: 10px;
  height: 10px;
`
const control = css`
  display: flex;
  place-items: center;
  border: solid 1px rgb(204, 204, 204);
  border-radius: inherit;
  font-size: 20px;
  color: #42515d;
  font-weight: bold;
  min-height: 30px;
  cursor: pointer;
  &:focus-within {
    box-shadow: 0px 0px 0px 1px rgb(38, 132, 255);
  }
`
const icon = css`
  display: flex;
  place-items: center;
`
const divider = css`
  height: 70%;
  border-left: solid 1px rgb(204, 204, 204);
`
const arrow = css`
  height: 60%;
  display: flex;
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
  width: auto;
  height: 25px;
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
  border-radius: 4px;
  position: relative;
`
const menu = css`
  width: 100%;
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
