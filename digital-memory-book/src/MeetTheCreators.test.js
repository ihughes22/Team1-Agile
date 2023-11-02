import React from 'react';
import { render, screen } from '@testing-library/react';
import MeetTheCreators from './MeetTheCreators';

test('renders MeetTheCreators page', () => {
    render(<MeetTheCreators />);
    
    // Ensure that the MeetTheCreators component is rendered.
    expect(screen.getByText('Meet the Creators')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(7);
});

test('displays team member details', () => {
    render(<MeetTheCreators />);

    const teamMembers = screen.getAllByTestId('people'); 

    const expectedNames = [
        'Isabel Hughes',
        'Rodney Wotton',
        'Ethan Kleschinsky',
        'Jolene Ciccarone',
        'Ashna Razdan',
        'Zuting Chen',
        'Ahmad Chaabane',
    ];

    teamMembers.forEach((member, index) => {
        expect(screen.getByText(expectedNames[index])).toBeInTheDocument();
    });
});
