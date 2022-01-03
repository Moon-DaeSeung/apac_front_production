import { css, SerializedStyles } from '@emotion/react'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
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
  customCss?: SerializedStyles | SerializedStyles[]
  options: any[]
  value: any
  onChange?: (value: any) => void
  getOptionLabel?: (option: any) => string
  renderMultiItemNode?: ({ option, deleteEvent }: {option: any, deleteEvent: () => void}) => React.ReactElement
  name?: string,
  autocomplete?: boolean
  eraser?: boolean
  multiple?: boolean
}

function Select ({
  customCss, name,
  value: controlledValue, onChange: setControlledValue,
  options: optionsProp, getOptionLabel: getOptionLabelProp,
  renderMultiItemNode,
  autocomplete = false, eraser = autocomplete, multiple = false
}: SelectProps, ref?: any) {
  const getOptionLabel = (option: any) => {
    if (option === null || option === undefined) return ''
    return getOptionLabelProp ? getOptionLabelProp(option) : (option as unknown as string).toString()
  }
  const inputRef = useRef(null)
  const [unControlledValue, setUncontrolledValue] = useState<any | null>(null)
  useImperativeHandle(ref, () => inputRef.current)
  const value = controlledValue !== undefined ? controlledValue : unControlledValue
  const onChange = setControlledValue !== undefined ? setControlledValue : setUncontrolledValue
  const handleDeleteItem = (option: any) => {
    const filtered = (value as any[]).filter((item) => item !== option)
    onChange(filtered)
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
    setSelectEl,
    styles,
    attributes,
    setIsMenuOpen
  } = useSelect({ value, options: optionsProp, getOptionLabel, onChange, inputRef, multiple })

  return (
    <div css={[select, customCss, selectIgnore, multiple || css`cursor: pointer;`]} ref={setSelectEl}>
      {multiple && <div css={mulitpleBox}>
        {(value as any[]).map((option: any, key: number) => {
          return (
            renderMultiItemNode
              ? renderMultiItemNode({ option, deleteEvent: () => handleDeleteItem(option) })
              : <div key={key} css={item}>
              <span css={itemName}>
                {getOptionLabel(option)}
              </span>
              <div css={[icon]}>
                <img src={crossIcon} css={[deleteItem]} onClick={() => handleDeleteItem(option)} />
              </div>
            </div>
          )
        })}
      </div>}
      <div css={control}>
        <input
          css={[input, customCss, inputIgnore, !autocomplete && css` &:focus { cursor: pointer;}`, !eraser && css`text-align: center;`]}
          ref={inputRef}
          name={name}
          value={inputValue}
          readOnly={!autocomplete}
          onChange={handleInputChange}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onFocus={() => setIsMenuOpen(true)}
          onKeyDown={handleKeyDown}
        />
        <div css={[icon, (!!inputValue && eraser) || css`display: none;`]}>
          <img src={crossIcon} css={cross} onClick={handleEraseValue} />
        </div>
        <div css={[icon]}>
          <div css={divider} />
        </div>
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
                    isFocused(option) && focusedItem,
                    isSelected(option) && selectedItem,
                    isFocused(option) && isSelected(option) && focusedSelctedItem
                  ]}
                  onMouseDown={(e) => { e.preventDefault(); handleOptionClick(option) } }
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
    </div >
  )
}

export default forwardRef(Select)

const mulitpleBox = css`
  display: flex;
  flex-wrap: wrap;
`
const control = css`
  display: flex;
`
const item = css`
  display: flex;
  padding: 2px 5px;
  place-items: center;
  margin: 5px 0 0 5px;
  background-color: #EBEBEB;
  border-radius: 25px;
  font-size: 0.7em;
`
const itemName = css`
  flex-grow: 1;
  padding: 0px 12px;
  text-align: center;
`
const deleteItem = css`
  box-sizing: border-box;
  padding: 0px;
  width: 13px;
  height: 13px;
  cursor: pointer;
  border-radius: 50px;
  background-color: white;
  :hover {
    background-color: whitesmoke;
  }
`
const select = css`
  width: 300px;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  border: solid 1px rgb(204, 204, 204);
  font-size: 16px;
  color: #42515d;
  :focus-within {
    box-shadow: 0px 0px 0px 1px rgb(38, 132, 255);
  }
`
const selectIgnore = css`
  height: auto;
  padding: 0;
`
const divider = css`
  height: 20px;
  margin: 0 1px;
  border-left: solid 1px rgb(204, 204, 204);
`
const arrow = css`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  :hover {
    background-color: whitesmoke;
  }
`
const icon = css`
  display: flex;
  place-items: center;
`
const cross = css`
  box-sizing: border-box;
  padding: 5px;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  :hover {
    background-color: whitesmoke;
  }
`
const up = css`
  transform: rotate(180deg);
`
const input = css`
  height: 35px;
  padding: 2px 5px;
`
const inputIgnore = css`
  align-self: flex-end;
  border: none;
  width: 0px;
  flex: 1 0 0;
  cursor: inherit;
  margin: 0;
  font-size: 1em;
  background-color: inherit;
  border-radius: inherit;
  &:focus {
    outline: none;
    cursor: text;
  }
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
const focusedItem = css`
  background-color: #F8F8F8;
`
const selectedItem = css`
  background-color: #F0F8FF;
`
const focusedSelctedItem = css`
  background-color: #CCE6FF;
`
