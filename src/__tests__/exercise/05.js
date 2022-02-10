// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { build, fake } from "@jackfranklin/test-data-bot";
import { rest } from "msw";
import { handlers } from "../../test/server-handlers";
import { setupServer } from "msw/node";
import Login from "../../components/login-submission";

// Ex 5

// const buildLoginForm = build({
//   fields: {
//     username: fake(f => f.internet.userName()),
//     password: fake(f => f.internet.password()),
//   },
// });

// const server = setupServer(
//   rest.post(
//     "https://auth-provider.example.com/api/login",
//     async (req, res, ctx) => {
//       if (!req.body.password) {
//         return res(ctx.status(400), ctx.json({ message: "password required" }));
//       }
//       if (!req.body.username) {
//         return res(ctx.status(400), ctx.json({ message: "username required" }));
//       }
//       return res(ctx.json({ username: req.body.username }));
//     },
//   ),
// );

// beforeAll(() => server.listen());
// afterAll(() => server.close());

// test(`logging in displays the user's username`, async () => {
//   render(<Login />);
//   const { username, password } = buildLoginForm();

//   userEvent.type(screen.getByLabelText(/username/i), username);
//   userEvent.type(screen.getByLabelText(/password/i), password);
//   userEvent.click(screen.getByRole("button", { name: /submit/i }));

//   await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

//   expect(screen.getByText(username)).toBeInTheDocument();
// });

// Ex 5 - extra 1

// const buildLoginForm = build({
//   fields: {
//     username: fake(f => f.internet.userName()),
//     password: fake(f => f.internet.password()),
//   },
// });

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterAll(() => server.close());

// test(`logging in displays the user's username`, async () => {
//   render(<Login />);
//   const { username, password } = buildLoginForm();

//   userEvent.type(screen.getByLabelText(/username/i), username);
//   userEvent.type(screen.getByLabelText(/password/i), password);
//   userEvent.click(screen.getByRole("button", { name: /submit/i }));

//   await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

//   expect(screen.getByText(username)).toBeInTheDocument();
// });

// Ex 5 - extra 2

// const buildLoginForm = build({
//   fields: {
//     username: fake(f => f.internet.userName()),
//     password: fake(f => f.internet.password()),
//   },
// });

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterAll(() => server.close());

// test(`logging in displays the user's username`, async () => {
//   render(<Login />);
//   const { username, password } = buildLoginForm();

//   userEvent.type(screen.getByLabelText(/username/i), username);
//   userEvent.type(screen.getByLabelText(/password/i), password);
//   userEvent.click(screen.getByRole("button", { name: /submit/i }));

//   await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

//   expect(screen.getByText(username)).toBeInTheDocument();
// });

// test(`test when password parameter is missing`, async () => {
//   render(<Login />);
//   const { username } = buildLoginForm();

//   userEvent.type(screen.getByLabelText(/username/i), username);
//   userEvent.click(screen.getByRole("button", { name: /submit/i }));

//   await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

//   expect(screen.getByText("password required")).toBeInTheDocument();
// });

// Ex 5 - extra 3

// const buildLoginForm = build({
//   fields: {
//     username: fake(f => f.internet.userName()),
//     password: fake(f => f.internet.password()),
//   },
// });

// const server = setupServer(...handlers);

// beforeAll(() => server.listen());
// afterAll(() => server.close());

// test(`logging in displays the user's username`, async () => {
//   render(<Login />);
//   const { username, password } = buildLoginForm();

//   userEvent.type(screen.getByLabelText(/username/i), username);
//   userEvent.type(screen.getByLabelText(/password/i), password);
//   userEvent.click(screen.getByRole("button", { name: /submit/i }));

//   await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

//   expect(screen.getByText(username)).toBeInTheDocument();
// });

// test(`test when password parameter is missing`, async () => {
//   render(<Login />);
//   const { username } = buildLoginForm();

//   userEvent.type(screen.getByLabelText(/username/i), username);
//   userEvent.click(screen.getByRole("button", { name: /submit/i }));

//   await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

//   expect(screen.getByRole("alert").textContent).toMatchInlineSnapshot(
//     `"password required"`,
//   );
// });

// Ex 5 - extra 4

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test(`logging in displays the user's username`, async () => {
  render(<Login />);
  const { username, password } = buildLoginForm();

  userEvent.type(screen.getByLabelText(/username/i), username);
  userEvent.type(screen.getByLabelText(/password/i), password);
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

  expect(screen.getByText(username)).toBeInTheDocument();
});

test(`test a internal server error`, async () => {
  const errorMessage = "Some server error";

  server.use(
    rest.post(
      "https://auth-provider.example.com/api/login",
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: errorMessage }));
      },
    ),
  );

  render(<Login />);

  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  await waitForElementToBeRemoved(() => screen.getAllByLabelText("loading..."));

  expect(screen.getByText(errorMessage)).toBeInTheDocument();
});
