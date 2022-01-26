// form testing
// http://localhost:3000/login

import * as React from "react";
import { render, screen } from "@testing-library/react";
import faker from "faker";
import { build, fake } from "@jackfranklin/test-data-bot";
import userEvent from "@testing-library/user-event";
import Login from "../../components/login";

// Ex 4

// test("submitting the form calls onSubmit with username and password", () => {
//   let submittedData;
//   const handleSubmit = data => (submittedData = data);
//   render(<Login onSubmit={handleSubmit} />);

//   const [username, password] = ["chucknorris", "i need no password"];

//   const submitButton = screen.getByText("Submit");

//   userEvent.type(screen.getByLabelText("Username"), username);
//   userEvent.type(screen.getByLabelText("Password"), password);
//   userEvent.click(submitButton);

//   expect(submittedData).toEqual({
//     username,
//     password,
//   });
// });

// Ex 4 - extra 1

// test("submitting the form calls onSubmit with username and password", () => {
//   const handleSubmit = jest.fn();
//   render(<Login onSubmit={handleSubmit} />);

//   const [username, password] = ["chucknorris", "i need no password"];

//   const submitButton = screen.getByText("Submit");

//   userEvent.type(screen.getByLabelText("Username"), username);
//   userEvent.type(screen.getByLabelText("Password"), password);
//   userEvent.click(submitButton);

//   expect(handleSubmit).toHaveBeenCalledWith({
//     username,
//     password,
//   });
// });

// Ex 4 - extra 2

// test("submitting the form calls onSubmit with username and password", () => {
//   function buildLoginForm() {
//     return {
//       username: faker.internet.userName(),
//       password: faker.internet.password(),
//     };
//   }

//   const { username, password } = buildLoginForm();

//   const handleSubmit = jest.fn();
//   render(<Login onSubmit={handleSubmit} />);

//   const submitButton = screen.getByText("Submit");

//   userEvent.type(screen.getByLabelText("Username"), username);
//   userEvent.type(screen.getByLabelText("Password"), password);
//   userEvent.click(submitButton);

//   expect(handleSubmit).toHaveBeenCalledWith({
//     username,
//     password,
//   });
// });

// Ex 4 - extra 3

// test("submitting the form calls onSubmit with username and password", () => {
//   function buildLoginForm(overrides) {
//     return {
//       username: faker.internet.userName(),
//       password: faker.internet.password(),
//       ...overrides,
//     };
//   }

//   const { username, password } = buildLoginForm({ username: "chucknorris" });

//   const handleSubmit = jest.fn();
//   render(<Login onSubmit={handleSubmit} />);

//   const submitButton = screen.getByText("Submit");

//   userEvent.type(screen.getByLabelText("Username"), username);
//   userEvent.type(screen.getByLabelText("Password"), password);
//   userEvent.click(submitButton);

//   expect(handleSubmit).toHaveBeenCalledWith({
//     username,
//     password,
//   });
// });

// Ex 4 - extra 4

test("submitting the form calls onSubmit with username and password", () => {
  const buildLoginForm = build({
    fields: {
      username: fake(faker => faker.internet.userName()),
      password: fake(faker => faker.internet.password()),
    },
  });

  const { username, password } = buildLoginForm();

  const handleSubmit = jest.fn();
  render(<Login onSubmit={handleSubmit} />);

  const submitButton = screen.getByText("Submit");

  userEvent.type(screen.getByLabelText("Username"), username);
  userEvent.type(screen.getByLabelText("Password"), password);
  userEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  });
});

/*
eslint
  no-unused-vars: "off",
*/
