import React from 'react';
import { render, fireEvent, getByPlaceholderText, getByText} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PostUploader from './PostUploader';

describe('PostUploader Component', () => {
  it('renders without crashing', () => {
    render(<Router><PostUploader /></Router>);
  });

  it('toggles the new post popup on new post button click', () => {
    const { getByText, container } = render(<Router><PostUploader /></Router>); //renders page

    const newPostButton = getByText('New Post'); // gets this button "New Post"
    fireEvent.click(newPostButton); // clicks that button, causing a popup to open

    const element = container.querySelector('#popupBox'); // select popup box by id
    const elementStyle = window.getComputedStyle(element); // get CSS of popup box

    expect(elementStyle.getPropertyValue('display')).toBe('block'); // check if display of the box is block (changed from default 'none' so it's visible once u click "New Post")
  });


  it('the popup box will not be displayed upon render', () => {
    const { container } = render(<Router><PostUploader /></Router>);

    const element = container.querySelector('#popupBox');
    const elementStyle = window.getComputedStyle(element);

    expect(elementStyle.getPropertyValue('display')).toBe('none');
  });


  it('displays a validation message when trying to upload without an image', () => {
    const { getByText } = render(<Router><PostUploader /></Router>);
    const newPostButton = getByText('New Post');

    fireEvent.click(newPostButton);

    const uploadButton = getByText('Upload');
    fireEvent.click(uploadButton);

    const validationMessage = getByText('An image is required');
    expect(validationMessage).toBeInTheDocument();
  });
  
  it('updates date when edited and toggles edit mode', () => {
    const { container, getByText } = render(<Router><PostUploader /></Router>);
  
    const newPostButton = getByText('New Post');
    fireEvent.click(newPostButton);
  
    const dateInput = container.querySelector('input[type="date"]');
    fireEvent.change(dateInput, { target: { value: '2023-11-02' } });
  
    const editButton = getByText('Edit');
    fireEvent.click(editButton);
  
    const editDateInput = container.querySelector('.edit-date-input');
    fireEvent.change(editDateInput, { target: { value: '2023-11-03' } });
  
    const updateButton = getByText('Update');
    fireEvent.click(updateButton);
  
    const updatedDate = container.querySelector('.date-container span').textContent;
    expect(updatedDate).toBe('11/03/2023');
  });
});
