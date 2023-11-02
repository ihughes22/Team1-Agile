import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactUs from './ContactUs';

test('renders ContactUs page', () => {
    render(<ContactUs />);
    
    // Ensure that the ContactUs component is rendered.
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText("We'd love to hear from you!")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
});

test('submits the contact form with valid input', () => {
    render(<ContactUs />);
    
    // Input valid values for name, email, and message
    fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Your Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Your Message'), { target: { value: 'Hello, this is a test message.' } });
    
    // Submit the form
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByPlaceholderText('Your Name').value == '');
    expect(screen.getByPlaceholderText('Your Email').value == '');
    expect(screen.getByPlaceholderText('Your Message').value == '');
});

