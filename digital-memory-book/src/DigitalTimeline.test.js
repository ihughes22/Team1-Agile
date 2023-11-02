import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DigitalTimeline from "./DigitalTimeline";

describe("DigitalTimeline component", () => {
  it("renders the timeline and clicks modal", () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <DigitalTimeline />
      </MemoryRouter>
    );

    const button = getByText("Create New Timeline");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    const modal = getByText("Enter the name of your new timeline!");
    expect(modal).toBeInTheDocument();

    const nameInput = getByPlaceholderText("Timeline Name");
    fireEvent.change(nameInput, { target: { value: "timelineName" } });
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
  });
});
