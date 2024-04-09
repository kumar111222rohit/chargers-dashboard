import React from 'react';
import './Chip.css';

interface Props {
  icon?: string;
  standard?: string;
  label: string;
  iconClass?: string;
  labelClass?: string;
  container?: string;
}
export const Chip: React.FC<Props> = ({
  icon = '',
  standard = '',
  label = '',
  iconClass = '',
  labelClass = '',
  container = '',
}) => {
  return (
    <>
      <div className={`${container} ${labelClass}`}>
        {iconClass && (
          <div className={`icon-wrapper ${iconClass}`}>
            {icon && (
              <div style={{ display: 'flex' }}>
                <img src={icon} />
              </div>
            )}
            {standard && <div>{standard}</div>}
          </div>
        )}
        <div
          className={`chip-label  ${!icon ? labelClass : ''}`}
          aria-label={label}
          data-testid="label"
        >
          {label}
        </div>
      </div>
    </>
  );
};
