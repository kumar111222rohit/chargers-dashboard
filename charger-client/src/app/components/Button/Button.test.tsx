import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('test Button component', () => {
  test('shoudl have correct buttoin label', () => {
    const btnLabel = 'Submit button';
    render(<Button btnLabel={btnLabel} dataTestId="submit-button" />);
    expect(screen.getByTestId('submit-button')).toHaveTextContent(btnLabel);
  });
  test('shuld test button onclick', () => {
    const handleClick = jest.fn();
    render(
      <Button
        btnLabel="Submit"
        onClick={handleClick}
        dataTestId="submit-button"
      />
    );
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('buttin should be disabled when disabled prop is true', () => {
    render(
      <Button btnLabel="Submit Button" disabled dataTestId="submit-button" />
    );
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });
});
