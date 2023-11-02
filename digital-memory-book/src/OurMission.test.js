import React from 'react';
import { render, screen } from '@testing-library/react';
import OurMission from './OurMission';

test('renders OurMission page', () => {
    render(<OurMission />);
    
    // Ensure that the MeetTheCreators component is rendered.
    expect(screen.getByText('Our Mission')).toBeInTheDocument();
    expect(screen.getByText('Our mission was to create a collaborative platform for families to build a digital timeline of memories with their loved ones in their final chapter of life. A slideshow of all the memories can be viewed at any time by all family membres. When a loved one closes their final chapter, the memories family members added can be turned into a book to celebrate their life at a funeral or memorial.')).toBeInTheDocument();
});
