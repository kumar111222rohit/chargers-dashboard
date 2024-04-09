import React, { ReactNode } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import './Header.css';
import { Tooltip } from '../Tooltip/Tooltip';

interface Props {
  headerText?: string;
  children?: ReactNode;
  tooltipText?: string;
  imgSrc?: string;
  altText?: string;
  customClass?: string;
}
export const Header: React.FC<Props> = ({
  headerText,
  children,
  tooltipText,
  imgSrc,
  altText,
  customClass = '',
}) => {
  return (
    <div className={classNames('header-container', customClass)}>
      {imgSrc && (
        <Image
          src={imgSrc}
          alt={altText || ''}
          width={100}
          height={24}
          priority
        />
      )}
      <Tooltip text={`${tooltipText}`}>
        <div
          className="header-label"
          aria-label={`Header with text ${headerText}`}
          data-testid="header-text"
        >
          {headerText}
        </div>
      </Tooltip>
      {children && <div>{children}</div>}
    </div>
  );
};
