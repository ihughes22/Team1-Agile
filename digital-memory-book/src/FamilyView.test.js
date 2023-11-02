import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FamilyView from './FamilyView';
import { MemoryRouter } from "react-router-dom";

test('renders FamilyView page', () => {
  render(
    <MemoryRouter>
      <FamilyView />
      const familyViewElement = screen.getByText('My Family View');
    expect(familyViewElement).toBeInTheDocument();
    </MemoryRouter>
    
  );
});


  it('opens the invite modal', () => {
    render(
        <MemoryRouter>
          <FamilyView />
         
    const inviteButton = screen.getByText('Invite Family Member');
    fireEvent.click(inviteButton);
    const inviteModal = screen.getByText('Invite Family Member');
    expect(inviteModal).toBeInTheDocument();
    const cancleButton = screen.getByText('Cancel');
    expect(cancleButton).toBeInTheDocument();
  
      </MemoryRouter>
    );
  });

  

  global.alert = jest.fn();

  describe('FamilyView', () => {
    it('invites a family member with a valid email', async () => {
      render(
        <MemoryRouter>
          <FamilyView />
        </MemoryRouter>
      );
        const inviteButton = screen.getByText('Invite Family Member');
      fireEvent.click(inviteButton);
      const inviteMethodDropdown = screen.getByRole('combobox');
      fireEvent.change(inviteMethodDropdown, { target: { value: 'email' } });
      const emailInput = screen.getByRole('textbox', { name: '' });
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
      const inviteMemberButton = screen.getByText('Invite Member');
      fireEvent.click(inviteMemberButton);
      expect(global.alert).toHaveBeenCalledWith('Invitation sent to valid@example.com using email');
      
    });
  });


  it('closes the invite modal', () => {
    render(
        <MemoryRouter>
          <FamilyView />
    const inviteButton = screen.getByText('Invite Family Member');
    fireEvent.click(inviteButton);
    const closeButton = screen.getByText('Cancel');
    fireEvent.click(closeButton);
    const inviteModal = screen.queryByText('Invite Family Member');
    expect(inviteModal).toBeNull();
    </MemoryRouter>
        );
  });
  
  it('removes a family member when the trash can icon is clicked', () => {
    render(
        <MemoryRouter>
          <FamilyView />
    fireEvent.click(screen.getByText('Show Members'));
    expect(screen.getByText('Family Members in the Timeline')).toBeInTheDocument();
    fireEvent.click(screen.getAllByAltText('Remove')[0]);
    expect(screen.getByText('Are you sure you want to remove this person?')).toBeInTheDocument();
    fireEvent.click(screen.getByText('OK'));
    expect(screen.queryByText('Joseph Slattery')).not.toBeInTheDocument();
    </MemoryRouter>
    );
  });
  