import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PostUploaderV2 from './PostUploaderV2'; // Assuming the component file is named PostUploaderV2.js

describe('PostUploaderV2 Component', () => {
  test('renders component with image upload and description elements', () => {
    render(<PostUploaderV2 isAuth={true} />);
    
    const uploadImageButton = screen.getByText('Upload Image');
    const descriptionTextarea = screen.getByPlaceholderText('Write a description...');
    const dateInput = screen.getByRole('textbox', { type: 'date' });
    
    expect(uploadImageButton).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
  });

  test('displays error message if no image is uploaded on submit', () => {
    render(<PostUploaderV2 isAuth={true} />);
    const uploadButton = screen.getByText('Upload');
    
    fireEvent.click(uploadButton);
    
    const errorMessage = screen.getByText('An image is required');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays error message if no date is provided on submit', () => {
    render(<PostUploaderV2 isAuth={true} />);
    const uploadImageButton = screen.getByText('Upload Image');
    const descriptionTextarea = screen.getByPlaceholderText('Write a description...');
    const uploadButton = screen.getByText('Upload');
    
    fireEvent.change(descriptionTextarea, { target: { value: 'Sample description' } });
    fireEvent.click(uploadImageButton);
    fireEvent.click(uploadButton);
    
    const errorMessage = screen.getByText('An image is required');
    expect(errorMessage).toBeInTheDocument();
  });
});
