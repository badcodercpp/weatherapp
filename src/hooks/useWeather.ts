import { useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { WeatherData } from '../types/weather';
import { WeatherDataContext } from '../state';
import { WeatherService } from '../service/weather';

export function useWeather(setWeatherInStorage: (data: WeatherData) => Promise<void>) {
    const weatherContextData = useContext(WeatherDataContext);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(weatherContextData);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchWeather = async (city: string) => {
        if (!city) {
            return;
        }
        setLoading(true);
        setError('');
        setWeatherData(null);
        try {
            const service = new WeatherService();
            service.formatCity(city);
            const data = await service.callApi();
            if (data.cod !== 200) {
                setError('City not found');
            } else {
                setWeatherData(data);
                setWeatherInStorage?.(data);
            }
        } catch (err) {
            setError('Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    };

    const getWeatherInStorage = async () => {
        try {
          const value = await AsyncStorage.getItem('my-key-weather');
          if (value) {
            const parsed = JSON.parse(value);
            setWeatherData(parsed as WeatherData);
            // value previously stored
          }
        } catch (e) {
          // error reading value
        }
      };

      useEffect(() => {
        getWeatherInStorage();
      }, []);

    return {
        weatherData,
        error,
        loading,
        fetchWeather,
    };
}
