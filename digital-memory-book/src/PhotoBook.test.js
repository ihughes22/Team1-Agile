import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import PhotoBook from './PhotoBook';

test('PhotoBook Component renders correctly', () => {
  render(
    <MemoryRouter>
      <PhotoBook isAuth={true} />
    </MemoryRouter>
  );

  expect(screen.getByText('Photobook')).toBeInTheDocument();
});
