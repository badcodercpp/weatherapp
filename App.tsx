import React, { useState } from 'react';
import { ThemeContext, WeatherDataContext } from './src/state';

import AsyncStorage from '@react-native-async-storage/async-storage';
import GetWeather from './src/components/getWeather';
import { ThemeEnum } from './src/enums';
import { WeatherData } from './src/types/weather';

export default function App() {
  const [themeValue, setThemeValue] = useState<ThemeEnum>(ThemeEnum.LIGHT);
  const [weatherData, _setWeatherData] = useState<WeatherData | null>(null);

  const setWeatherInStorage = async (data: WeatherData) => {
    try {
      if (data) {
        await AsyncStorage.setItem('my-key-weather', JSON.stringify(data));
      }
    } catch (e) {
      // saving error
    }
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <WeatherDataContext.Provider value={weatherData}>
        <GetWeather setWeatherInStorage={setWeatherInStorage} setThemeValue={setThemeValue} />
      </WeatherDataContext.Provider>
    </ThemeContext.Provider>

  );
}
