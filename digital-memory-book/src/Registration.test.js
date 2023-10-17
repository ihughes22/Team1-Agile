import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Registration from './Registration';

test('renders registration page', () => {
    render(<Registration />);
    
    // Ensure that the Registration component is rendered.
    expect(screen.getByTestId('error'),).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('username')).toBeInTheDocument()
    expect(screen.getByTestId('password')).toBeInTheDocument()
    expect(screen.getByTestId('cpassword')).toBeInTheDocument()
    expect(screen.getByTestId('registerb')).toBeInTheDocument()
});
 
test('invalid email address', () => {
    render(<Registration />);

    //input invalid email
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'aaaa' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should receive an error about an invalid email
    expect(screen.getByTestId('error').innerHTML).toBe('Invalid email address.');
});

test('entered no username', () => {
    render(<Registration />);

    //input valid email
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'a@a.com' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should receive an error about not entering a username
    expect(screen.getByTestId('error').innerHTML).toBe('Please enter a username.');
});
 
test('passwords don\'t match', () => {
    render(<Registration />);

    //input valid email/username
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'abbybb' } });

    //only enter in first password
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password123' } });

    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should receive an error about an nonmatching passwords
    expect(screen.getByTestId('error').innerHTML).toBe('Passwords do not match.');
});

test('password isn\'t valid', () => {
    render(<Registration />);

    //input valid email/username
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'abbybb' } });

    //enter in not long enough matching passwords
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'pass' } });
    fireEvent.change(screen.getByTestId('cpassword'), { target: { value: 'pass' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should receive an error about not enough 
    expect(screen.getByTestId('error').innerHTML).toBe('Password must contain at least 8 letters.');

    //make passwords long enough
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password' } });
    fireEvent.change(screen.getByTestId('cpassword'), { target: { value: 'password' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should receive an error about missing a number
    expect(screen.getByTestId('error').innerHTML).toBe('Password must contain at least one number.');

    //add numbers to passwords
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password1' } });
    fireEvent.change(screen.getByTestId('cpassword'), { target: { value: 'password1' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should receive an error about missing a special character
    expect(screen.getByTestId('error').innerHTML).toBe('Password must contain a special character.');
});

test('valid login', () => {
    render(<Registration />);

    //input valid email/username
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'abbybb' } });

    //enter 8 characters, 1 number, 1 special password
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password1!' } });
    fireEvent.change(screen.getByTestId('cpassword'), { target: { value: 'password1!' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should be on the login page!
    expect(screen.getByTestId('welcome')).toBeInTheDocument()
    expect(screen.getByTestId('logoutb')).toBeInTheDocument()
});

test('valid logout', () => {
    render(<Registration />);

    //input valid email/username
    fireEvent.change(screen.getByTestId('email'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByTestId('username'), { target: { value: 'abbybb' } });

    //enter 8 characters, 1 number, 1 special password
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'password1!' } });
    fireEvent.change(screen.getByTestId('cpassword'), { target: { value: 'password1!' } });
    
    //click register button
    fireEvent.click(screen.getByTestId('registerb'));

    //should be on the login page! -> immediately logout
    fireEvent.click(screen.getByTestId('logoutb'));

    //check if returned to an empty registration page
    expect(screen.getByTestId('email').value).toBe('');
    expect(screen.getByTestId('username').value).toBe('');
    expect(screen.getByTestId('password').value).toBe('');
    expect(screen.getByTestId('cpassword').value).toBe('');
    expect(screen.getByTestId('error').innerHTML).toBe('');
});