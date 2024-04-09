import React from 'react';
import { render, screen } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip component', () => {
  const label = 'CONNECTED';
  test('should render the label correctly', () => {
    render(<Chip label={label} />);
    expect(screen.getByTestId('label')).toHaveTextContent(label);
  });

  test('shold render the icon when provided', () => {
    const testIcon = 'static/assets/ccs.png';
    const iconAltText = 'CCS';
    render(<Chip icon={testIcon} iconClass={iconAltText} label={label} />);
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', testIcon);
  });

  test(' should apply  custom classes to container and label', () => {
    const containerClass = 'connected-container';
    const labelClass = 'connected-label';
    const label = 'CONNECTED';
    render(
      <Chip container={containerClass} labelClass={labelClass} label={label} />
    );

    const container = screen.getByTestId('label').parentNode;
    expect(container).toHaveClass(containerClass);
    expect(screen.getByLabelText(label)).toHaveClass(labelClass);
  });
});
