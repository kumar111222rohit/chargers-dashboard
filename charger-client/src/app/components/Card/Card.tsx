import React from 'react';
import './Card.css';

interface Props {
  headerText: string;
  contents: { [key: string]: string };
}
export const Card: React.FC<Props> = ({ headerText, contents }) => {
  return (
    <>
      <div className="card-container">
        <div className="card-header" aria-label={`${headerText}`}>
          {headerText}
        </div>
        <div className="card-content">
          {Object.entries(contents).map(([key, value]) => (
            <div className="content-wrapper">
              <div className="label" aria-label={`${key}`}>
                {key}
              </div>
              <div className="value" aria-label={`${value}`}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
