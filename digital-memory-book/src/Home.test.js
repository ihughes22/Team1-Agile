import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  test('renders welcome message and login button when not authenticated', () => {
    const { getByText } = render(<Home isAuth={false} />);
    const welcomeMessage = getByText('Welcome to My Memory Book Software');
    const loginButton = getByText('Log In');
    
    expect(welcomeMessage).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('renders welcome message for authenticated users', () => {
    const { getByText, queryByText } = render(<Home isAuth={true} />);
    const welcomeMessage = getByText('Welcome to My Memory Book Software');
    const loginButton = queryByText('Log In');
    const gladMessage = getByText("Glad you're here!");

    expect(welcomeMessage).toBeInTheDocument();
    expect(loginButton).not.toBeInTheDocument();
    expect(gladMessage).toBeInTheDocument();
  });
});