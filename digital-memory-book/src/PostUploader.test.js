import React from "react";
import {
  render,
  fireEvent,
  getByPlaceholderText,
  getByText,
} from "@testing-library/react";
import PostUploader from "./PostUploader";

describe("PostUploader Component", () => {
  it("renders without crashing", () => {
    render(<PostUploader />);
  });

  it("toggles the new post popup on new post button click", () => {
    const { getByText, container } = render(<PostUploader />); //renders page

    const newPostButton = getByText("New Post"); // gets this button "New Post"
    fireEvent.click(newPostButton); // clicks that button, causing a popup to open

    const element = container.querySelector("#popupBox"); // select popup box by id
    const elementStyle = window.getComputedStyle(element); // get CSS of popup box

    expect(elementStyle.getPropertyValue("display")).toBe("block"); // check if display of the box is block (changed from default 'none' so it's visible once u click "New Post")
  });
});
