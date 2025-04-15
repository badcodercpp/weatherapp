# 🌤️ Weather App (React Native + TypeScript)

A simple cross-platform Weather App built using **React Native**, **TypeScript**, and **OpenWeatherMap API**. Supports iOS and Android via **React Native**, includes a **dark theme toggle**, and allows users to fetch weather data for any city.

---

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Displays:
  - City name
  - Current temperature
  - Weather condition
  - Weather icon
- ⚠️ Shows error if city not found
- 🌙 Light/Dark mode toggle
- 🔁 Fully functional custom API hook

---

## 📸 Screenshots

![alt text](<Simulator Screenshot - iPhone 15 Pro - 2025-04-15 at 11.16.02.png>)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/badcodercpp/weatherapp.git
cd weatherapp
```

### 2. Install Dependency

```bash
yarn install
cd ios 
pod install
cd ..
```

### 3. Run app

```bash
yarn start
then open new terminal
yarn ios or use xcode to run app
```

### 3. Test app

```bash
yarn test
```

Here’s a clear and concise **approach** for how the Weather App code is structured and how it works—great for documentation, handoff, or planning future enhancements.

---

## 🧭 **Approach: React Native Weather App**

### 📌 **Objective**
Build a simple, cross-platform Weather App using **React Native + TypeScript** that:
- Fetches weather data from OpenWeatherMap API
- Supports **light/dark themes**
- Handles input, loading states, and error cases
- Works on both iOS and Android

---

### **Architecture Overview**

####  Component: `GetWeather`
Responsible for:
- UI rendering
- User input for city search
- Theme selection via radio buttons
- Triggering API calls via `useWeather` hook
- Displaying weather results or errors

Props:
- `setWeatherInStorage`: stores fetched data externally (e.g., AsyncStorage)
- `setThemeValue`: updates app-wide theme state

---

####  Hook: `useWeather`
Encapsulates the API logic:
- Exposes `weatherData`, `loading`, `error`, and `fetchWeather`
- `fetchWeather(city)` fetches weather data from OpenWeatherMap API
- Handles loading and error states
- Optionally saves successful data using `setWeatherInStorage`

---

####  Theming
- Uses a custom `ThemeContext` (with values from `ThemeEnum`)
- Themes (`lightTheme`, `darkTheme`) are defined separately with typed styles
- Dynamically applies theme in `GetWeather` using `createStyle(theme)`

---

####  State Management
- Local `useState` manages city input
- `useContext(ThemeContext)` provides current theme
- Theme is changeable via `react-native-simple-radio-button`
- Weather data is retrieved via the custom hook

---

###  Testing Strategy
- Mocks external dependencies: `useWeather`, `AsyncStorage`, and `react-native-simple-radio-button`
- Tests cover:
  - UI rendering
  - Input + button interaction
  - Theme switching
  - Conditional rendering of weather results and error messages

---