import React from 'react';
import classNames from 'classnames';

import './Button.css';

interface Props {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  btnLabel: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  customClass?: string;
  ariaLabel?: string;
  dataTestId?: string;
}
export const Button: React.FC<Props> = ({
  onClick,
  btnLabel,
  type,
  disabled,
  customClass = '',
  ariaLabel = '',
  dataTestId,
}) => {
  return (
    <button
      className={classNames('submit-button', customClass)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-testid={dataTestId}
    >
      {btnLabel}
    </button>
  );
};
