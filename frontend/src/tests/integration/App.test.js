import { render, screen } from "@testing-library/react";
import App from "../../App";

test("renders EcoRoute Portal header", () => {
  render(<App />);
  const headerElement = screen.getByText(/EcoRoute Portal/i);
  expect(headerElement).toBeInTheDocument();
});
