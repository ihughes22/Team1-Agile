import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('renders login page', () => {
    render(<Login />);
    
    // Ensure that the Login component is rendered.
    expect(screen.getByTestId('login'),).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByTestId('loginb')).toBeInTheDocument()
    expect(screen.getByTestId('error')).toBeInTheDocument()

    //check that it only sees the comeponents i made
    expect(screen.queryByTestId('does-not-exist'),).not.toBeInTheDocument()
});

test('displays error message for unsuccessful login', () => {
    render(<Login />);

    // Simulate an unsuccessful login. 
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalidUser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidPassword' } });
    
    //check that username and password were changed
    expect(screen.getByPlaceholderText('Email').value).toBe('invalidUser');
    expect(screen.getByPlaceholderText('Password').value).toBe('invalidPassword');
    
    //click login button
    fireEvent.click(screen.getByTestId('loginb'));

    // Ensure that the error message is displayed.
    expect(screen.getByTestId('error').innerHTML).toBe('The email/password you entered is invalid or does not exist.');
});


test('allows successful login', () => {
    render(<Login />);
    
    // Simulate a successful login.
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ibhughes22@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'GGGoober123!!' } });
    
    //check that username and password were changed
    expect(screen.getByPlaceholderText('Email').value).toBe('ibhughes22@gmail.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('GGGoober123!!');
    
    //click login button
    fireEvent.click(screen.getByTestId('loginb'));

    // Ensure that the welcome message is displayed.
    expect(screen.getByTestId('error').innerHTML).toBe('');
});