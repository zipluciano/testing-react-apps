// Avoid implementation details
// http://localhost:3000/counter

import * as React from "react";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, screen } from "@testing-library/react";
import Counter from "../../components/counter";

// Ex 3

// test("counter increments and decrements when the buttons are clicked", () => {
//   render(<Counter />);

//   const message = screen.getByText("Current count: 0");
//   const [decrement, increment] = screen.getAllByRole("button");

//   expect(message).toHaveTextContent("Current count: 0");
//   fireEvent.click(increment);

//   expect(message).toHaveTextContent("Current count: 1");
//   fireEvent.click(decrement);
//   expect(message).toHaveTextContent("Current count: 0");
// });

// Ex 3 - extra 1

test("counter increments and decrements when the buttons are clicked", () => {
  render(<Counter />);

  const message = screen.getByText("Current count: 0");
  const [decrement, increment] = [
    screen.getByRole("button", { name: "Decrement" }),
    screen.getByRole("button", { name: "Increment" }),
  ];

  expect(message).toHaveTextContent("Current count: 0");
  userEvent.click(increment);

  expect(message).toHaveTextContent("Current count: 1");
  userEvent.click(decrement);
  expect(message).toHaveTextContent("Current count: 0");
});
