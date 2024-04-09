import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  const headerText = 'Charger';
  const cardContents = {
    'Charger Serial Number': '12345',
    'Charger Status': 'Connected',
  };

  test('shoudl render Card  with props as passed', () => {
    render(<Card headerText={headerText} contents={cardContents} />);

    expect(screen.getByText(headerText)).toBeInTheDocument();

    Object.entries(cardContents).forEach(([key, value]) => {
      expect(screen.getByText(key)).toBeInTheDocument();
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });
});
