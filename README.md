# Dan's It's Lit component

This repository features a Web Component built with Lit. It's a button that works as a counter and displays animations when being clicked.

## Options

- `allows-one-time-click`: Allows the consumer to determine if the button is meant to be used one time per user
- `count`: The initial count of clicks

## Technical information

### How to launch the application

#### Requirements

> The application has been built with Node version 16.

- Node
- Git

#### Instructions

- Clone the [repository](https://github.com/DanPlaza/dan-its-lit.git)
- Install the dependencies by running `npm install` in a terminal
- Start the demo by executing `npm run dev`

### Tests

Tests have been created by means of Web Test Runner. To execute them run `npm run test` in a terminal.

## Pending work

- Improve the animations.
- Create a disabled state for the button.
- Add a property to prevent users from increasing the counter if they have already done so.
- Convert the amount of clicks to a more readable format once they pass a defined threshold.
