import React, { ReactNode } from 'react'
import { css } from '@emotion/react'

export type PaginationBaseProps = {
  children: ReactNode,
  previousButton?: ReactNode| null,
  nextButton?: ReactNode | null,
  firstButton?: ReactNode | null,
  lastButton?: ReactNode | null,
  ellipse?: ReactNode | null,
  showLeftEllipse?: boolean,
  showRightEllipse?: boolean
}

export default function PaginationBase ({
  children,
  previousButton,
  nextButton,
  firstButton,
  lastButton,
  ellipse,
  showLeftEllipse,
  showRightEllipse
}: PaginationBaseProps) {
  return (
    <>
      <ul css={paginationListStyle}>
        {firstButton}
        {previousButton}
        {showLeftEllipse ? ellipse : null}
        {children}
        {showRightEllipse ? ellipse : null}
        {nextButton}
        {lastButton}
      </ul>
    </>
  )
}

const paginationListStyle = css`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`
