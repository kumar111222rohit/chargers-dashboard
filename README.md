# Charger Dasboard App

This Next.js application provides a dashboard to play around with performing CRUD operation on chargers. You can also view realtion of a charger with its station, perform filtering and share the filtered url with others.

## Authors

- [Rohit kumar](https://github.com/kumar111222rohit)

## Environment Settings

To run this project, node version required
` v18.18.0`

## Local Installation

To run the project, you need to clone it first

Install dependencies

```bash
   npm install
```

Build the app

```bash
   npm run build
```

Start the app

```bash
  npm run start
  The app should run on http://localhost:3000
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Functionalities

- See charger overview
- Add/Edit/Delete a charger
- Filter the Dasboard
- Share the url with others with pre applied filters.
- Tooltip
- Intersection observer for infine scroll
- Debounced search

## Features

- Built on Next.js
- Responsive for mobile and desktop
- Accessibility: Built with WCAG support for inclusive user experience.

- Type Safety: Ensured by TypeScript for enhanced code maintainability.

- React Framework: Utilizes React for efficient component-based development.

- Reusable Components: Promotes modularity and code reusability.
- Localization Ready: Supports potential internationalization efforts.
- Server-Side Rendering (SSR)
- Code Splitting: Optimizes bundle size and loading time.
- Linting and Prettier: Enforces consistent code style and formatting.
- React redux for global state managament
- React Context: Provides centralized state management among components.
- Functional Components and Hooks: Leverages modern React features for component composition.
- API Integration: Seamlessly fetches data from the charger service.
- Code Modularization: Organizes code into logical modules for better readability.
- Error Handling: Implements robust error handling mechanisms.
- Unit test for components and APIs setup on jest and react testing library

## Tools and library

- Next
- React
- Redux toolkit
- React Context
- i18 translations
- jest
- react testing library
- eslint & Prettier with husky
- Tan stack query
- Tan stack table
- React hooks form

## Component architecture

- Gloabl state management is done via redux store
- Props sharing among components via react context

  You can check the architecture diagram here:

  https://drive.google.com/file/d/1XcSbBNkw0BB4iZkGHiodV4H2QPX6kBKh/view?usp=sharing

  <img width="955" alt="Screenshot 2024-04-09 at 15 55 55" src="https://github.com/kumar111222rohit/chargers-dashboard/assets/8679506/a79df49a-0955-43ed-897f-f28f02c90534">


### Screenshots
<img width="1728" alt="Screenshot 2024-04-09 at 15 56 41" src="https://github.com/kumar111222rohit/chargers-dashboard/assets/8679506/6e70b58c-5b6c-4160-a7c4-44a4a1fdbc29">

<img width="1724" alt="Screenshot 2024-04-09 at 15 57 01" src="https://github.com/kumar111222rohit/chargers-dashboard/assets/8679506/a2834838-60ac-402c-af67-346c263aaecd">


<img width="1728" alt="Screenshot 2024-04-09 at 15 57 16" src="https://github.com/kumar111222rohit/chargers-dashboard/assets/8679506/47e6c857-9a5c-49ea-b995-c29366e5b0d5">

<img width="1724" alt="Screenshot 2024-04-09 at 15 57 31" src="https://github.com/kumar111222rohit/chargers-dashboard/assets/8679506/51e411c2-5486-4eb0-b051-d5a62c80c2ea">


<img width="1724" alt="Screenshot 2024-04-09 at 15 57 51" src="https://github.com/kumar111222rohit/chargers-dashboard/assets/8679506/a79bfb6b-4d53-4e3a-b71f-0932b6306248">





## Areas of improvement/known issues

- Make table view better in mobile view
- Table header dimension fix upon filtering
- add some loaders for API calls
- add some skeleton UI while loading
- add more test coverage as needed
- retain selected filter values in input fields

## 🚀 About Me

Learning, Unlearning and Re-learning everyday.
