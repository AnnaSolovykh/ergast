# ErgastApp

A test React Native application using the [Ergast Developer API](https://ergast.com/mrd/) to display a list of F1 drivers and their race history.

## Tech Stack

- React Native CLI (TypeScript)
- React Navigation
- Redux Toolkit with Thunk
- Axios
- Redux Persist
- AsyncStorage

## Getting Started

```bash
npm install
npx pod-install ios 
npx react-native run-ios
```

```bash
npm install
npx react-native run-android 
```

## Features Implemented

- Paginated list of F1 drivers using API navigation (not preloading all data)
- Driver details screen with formatted information
- Race history screen per driver with list view
- Error handling with user feedback in both list and details views
- Typed navigation (RootStackParamList) and data models (Driver, Race)
- Redux global state management with redux-thunk and redux-persist
- UI styled using StyleSheet
  