# Shopping App

A cross-platform shopping app built with Expo, React Native, Expo Router, and
TypeScript. It uses the [Fake Store API](https://fakestoreapi.com/) for product
data and local device storage for accounts, sessions, carts, and profile photos.

## Features

- Register and log in with validated forms
- Optional remembered login session
- Browse products in a two-column grid
- Search products by title
- Pull to refresh the product catalog
- View product details, descriptions, ratings, and pricing
- Add, remove, increase, or decrease products in the cart
- Per-user persistent cart stored on the device
- Display cart item count and total
- Simulated checkout
- View profile information and log out
- Take or flip a camera for a profile photo
- Camera permission handling with a link to device settings

## Screens and routes

| Route           | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `/`             | Restores authentication state and redirects to login or products |
| `/login`        | Account login                                                    |
| `/register`     | Account registration                                             |
| `/products`     | Product search and catalog                                       |
| `/product/[id]` | Selected product details                                         |
| `/cart`         | Cart management and simulated checkout                           |
| `/profile`      | User profile, profile photo, and logout                          |
| `/camera`       | Profile photo camera modal                                       |

Protected tabs redirect unauthenticated users to `/login`.

## Technology

- Expo SDK 58
- React 19.3
- React Native 0.88
- Expo Router 58
- TypeScript 6
- React Hook Form and Yup
- AsyncStorage
- Expo Camera
- Fake Store API

## Requirements

- Node.js 18 or newer
- A package manager such as npm
- Android Studio and an Android emulator, Xcode and an iOS simulator, or
  Expo Go for a physical device
- Internet access to load products and images

## Installation

Install the project dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

From the terminal menu, open the app on:

- Android emulator
- iOS simulator
- Expo Go
- A web browser

You can also start a platform directly:

```bash
npm run android
npm run ios
npm run web
```

## Usage

1. Register a local account from `/register`.
2. Log in from `/login`.
3. Browse or search products and open a product for details.
4. Add products to the cart.
5. Open the Cart tab to change quantities or remove items.
6. Use Checkout to simulate an order.
7. Open the Profile tab to take a profile photo or log out.

## Data and storage

This project is a demo and does not connect to a backend authentication or
commerce service.

- Accounts are stored in AsyncStorage under `users`.
- The remembered session is stored under `session_email`.
- Each user's cart is stored under `cart_<email>`.
- Profile photos are stored as compressed base64 JPEG data URLs.
- Product lists and details are fetched from `https://fakestoreapi.com`.
- Checkout only clears the cart after an alert; it does not place a real order.

Account passwords are stored locally for demonstration purposes and are not
encrypted or suitable for production use.

## Camera permissions

The app requests access to the device camera from the Profile screen. If
permission is denied permanently, the camera screen provides an action to open
the device settings.

## Project structure

```text
src/
├── api/                 # Fake Store API requests
├── app/                 # Expo Router screens and layouts
│   ├── (tabs)/          # Products, cart, and profile tabs
│   ├── product/[id].tsx # Product details screen
│   ├── camera.tsx       # Profile photo camera
│   ├── login.tsx        # Login screen
│   └── register.tsx     # Registration screen
├── components/          # Reusable UI components
├── context/             # Authentication and cart providers
├── types/               # Shared TypeScript types
├── validation/          # Yup form schemas
└── theme.ts             # Shared application colors
```

## Available scripts

| Command                 | Purpose                      |
| ----------------------- | ---------------------------- |
| `npm start`             | Start Expo                   |
| `npm run android`       | Start on Android             |
| `npm run ios`           | Start on iOS                 |
| `npm run web`           | Start on web                 |
| `npm run lint`          | Run Expo lint checks         |
| `npm run reset-project` | Run the project reset script |

## Validation

Run the Expo linter:

```bash
npx expo lint
```

Run a TypeScript type check:

```bash
npx tsc --noEmit
```
