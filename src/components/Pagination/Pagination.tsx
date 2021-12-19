import React, { useState } from 'react'
import doubleLeftArrowIcon from '../../images/double_left_arrow_round.svg'
import leftArrowIcon from '../../images/letf_arrow_round.svg'
import doubleRightArrowIcon from '../../images/double_right_arrow_round.svg'
import rightArrowicon from '../../images/right_arrow_round.svg'
import { css } from '@emotion/react'
import PaginationBase from '../PaginationBase'

export type PaginationProps = {
  totalPageCount: number,
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
  visiblePageCount?: number,
  hideNextButton?: boolean,
  hidePreviousButton?: boolean,
  showFirstButton?: boolean,
  showLastButton?: boolean
}

export default function Pagination ({
  totalPageCount,
  visiblePageCount = 10,
  currentPage,
  setCurrentPage,
  hideNextButton = false,
  hidePreviousButton = false,
  showFirstButton = false,
  showLastButton = false
}: PaginationProps) {
  const initialMinPageNumberLimit = 0
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(initialMinPageNumberLimit)
  const maxPageNumberLimit = minPageNumberLimit + visiblePageCount
  const pages: number[] = [...Array(totalPageCount).keys()]

  const handlePreviousButton = () => {
    setCurrentPage(currentPage - 1)

    if ((currentPage) % visiblePageCount === 0) {
      setMinPageNumberLimit(minPageNumberLimit - visiblePageCount)
    }
  }

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1)

    if (currentPage + 1 >= maxPageNumberLimit) {
      setMinPageNumberLimit(minPageNumberLimit + visiblePageCount)
    }
  }

  const handleFirstButton = () => {
    setCurrentPage(0)
    setMinPageNumberLimit(initialMinPageNumberLimit)
  }

  const handleLastButton = () => {
    setCurrentPage(totalPageCount - 1)
    const temporaryMinPageLimit = Math.floor(totalPageCount / visiblePageCount) * visiblePageCount
    temporaryMinPageLimit === totalPageCount ? setMinPageNumberLimit(temporaryMinPageLimit - visiblePageCount) : setMinPageNumberLimit(temporaryMinPageLimit)
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit && number >= minPageNumberLimit) {
      return (
        <li css={[pageNumberStyle, number === currentPage ? activePageNumberStyle : null]} key={number} onClick={() => setCurrentPage(number)}>
          <span css={[pageTextStyle, number === currentPage ? activePageTextStyle : null]}>
            {number + 1}
          </span>
        </li>
      )
    } else {
      return null
    }
  })

  return (
    <PaginationBase
      firstButton={
        showFirstButton &&
        <li>
          <button
            css={buttonStyle(doubleLeftArrowIcon)}
            onClick={handleFirstButton}
            disabled={currentPage === 0}
          />
        </li>
      }
      previousButton={
        !hidePreviousButton &&
        <li>
          <button
            css={buttonStyle(leftArrowIcon)}
            onClick={handlePreviousButton}
            disabled={currentPage === 0}
          />
        </li>
      }
      ellipse={<li>...</li>}
      nextButton={
        !hideNextButton &&
        <li>
          <button
            css={buttonStyle(rightArrowicon)}
            onClick={handleNextButton}
            disabled={currentPage === totalPageCount - 1}
          />
        </li>
      }
      lastButton={
        showLastButton &&
        <li>
          <button
            css={buttonStyle(doubleRightArrowIcon)}
            onClick={handleLastButton}
            disabled={currentPage === totalPageCount - 1}
          />
        </li>
      }
      showRightEllipse={totalPageCount > maxPageNumberLimit}
      showLeftEllipse={minPageNumberLimit >= 1}
    >
      {renderPageNumbers}
    </PaginationBase>
  )
}

const buttonStyle = (image: string) => css`
  background: url(${image}) no-repeat;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  margin: 0 10px;

  :enabled {
    cursor: pointer;
  }
`

const pageNumberStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0 10px;
  cursor: pointer;
  background: #eaeff2;

  &:hover {
      background: #2f97ff;
      > span {
        color: white;
      }
    }
  `

const activePageNumberStyle = css`
    background: #2f97ff;
  `

const pageTextStyle = css`
  font-size: 17px;
  font-weight: bold;
  color: #acb1bf;
`

const activePageTextStyle = css`
  color: #ffffff;
`
