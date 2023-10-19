import React from "react";
import { render, screen } from "@testing-library/react";

import Home from "./Home";
import About from "./About";
import NavbarTop from "./NavbarTop";
import { fireEvent, waitFor } from "@testing-library/react";

describe("Check if home, about, and navbar render", () => {
  //renders the home page with navbar
  it("renders on Home Page", () => {
    render(<Home></Home>);
  });
  //renders the about page with navbar
  it("renders on About Page", () => {
    render(<About></About>);
  });
  //renders the navbar and finds the about page link
  //then simulates clicking the about page link
  //then about page renders and checks the page title
  test("NavbarTop component renders", async () => {
    const { getByText } = render(<NavbarTop />);

    const brandElement = getByText("Digital Memory Book");
    expect(brandElement).toBeInTheDocument();
    const aboutLink = getByText("About");
    fireEvent.click(aboutLink);
    await waitFor(() => {
      const pageTitle = screen.getByText("About");
      expect(pageTitle).toBeInTheDocument();
    });
  });
});
