# Toptal take-home project

## Table of Contents

- [Requirements](#requirements)
- [Stack](#stack)
- [Setup](#setup)
- [Deployment](#deployment)
- [Installing the app](#installing-the-app)
- [Preview](#preview)

## Requirements

Write an application that manages apartment rentals

- [x] Users must be able to create an account and log in. (If a mobile application, this means that multiple users can use the app from the same phone).
- [x] Implement a client role:
  - [x] Clients are able to browse rentable apartments in a list and on a map.
- [x] Implement a realtor role:
  - [x] Realtors would be able to browse all rentable- and already rented apartments in a list and on a map.
  - [x] Realtors would be able to CRUD all apartments and set the apartment state to available/rented.
- [x] Implement an admin role:
  - [x] Admins would be able CRUD all apartments, realtors, and clients.
- [x] When an apartment is added, each new entry must have a name, description, floor area size, price per month, number of rooms, valid geolocation coordinates, date added and an associated realtor.
- [x] Geolocation coordinates should be added either by providing latitude/longitude directly or through address geocoding (https://developers.google.com/maps/documentation/javascript/geocoding).
- [x] All users should be able to filter the displayed apartments by size, price, and the number of rooms.
- [x] REST API. Make it possible to perform all user actions via the API, including authentication (If a mobile application and you don’t know how to create your own backend you can use Firebase.com or similar services to create the API).
- [x] In both cases, you should be able to explain how a REST API works and demonstrate that by creating functional tests that use the REST Layer directly. Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.
- [x] If it’s a web application, it must be a single-page application. All actions need to be done client-side using AJAX, refreshing the page is not acceptable. (If a mobile application, disregard this).
- [x] Functional UI/UX design is needed. You are not required to create a unique design, however, do follow best practices to make the project as functional as possible.
- [ ] Bonus: unit and e2e tests.

## Stack

Android and iOS app for phones and tablets. Future support for a web app version can be added with some minor changes in the codebase.

- React Native (Expo)
- Firebase (Authentication + Firestore)
- TypeScript
- ESLint
- Prettier
- React Native Paper
- React Navigation

## Setup

1. Install Expo CLI
   `$ npm install -g expo-cli`

2. Install Firebase CLI
   `$ npm install -g firebase-tools`

3. Ensure correct Node version is installed
   `$ nvm install && nvm use`

4. Install dependencies
   `$ yarn`

5. Start Expo development server
   `$ yarn start`

## Deployment

Run the command `$ yarn deploy` to deploy both Firebase Security Rules + Indexes and Expo app to the link below. Sign in to both Firebase and Expo will be required.

## Installing the app

Follow the instructions here https://expo.io/@grifotv/lar

Once the Expo Client app is open, sign in with the user:

- username: `grifotv`
- password: `Toptal1234`

Once the TopLar app is open, feel free to create a new account or use one of the following ones:

### Admin user

- email: `admin@grifo.tv`
- password: `Toptal1234`

### Realtor user

- email: `realtor@grifo.tv`
- password: `Toptal1234`

### Client user

- email: `client@grifo.tv`
- password: `Toptal1234`

## Preview

<img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/01.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/02.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/03.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/04.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/05.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/06.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/07.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/08.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/09.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/10.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/11.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/12.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/13.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/14.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/15.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/16.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/17.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/18.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/19.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/20.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/21.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/22.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/23.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/24.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/25.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/26.png"><img width="33%" src="https://git.toptal.com/screening/danilo-figueiredo/raw/develop/docs/assets/27.png">
