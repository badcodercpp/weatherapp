import { act, renderHook, waitFor } from '@testing-library/react-native';

import { useWeather } from '../src/hooks/useWeather';

jest.mock('@react-native-async-storage/async-storage');

describe('useWeather', () => {
    it('should fetch weather data and update state when given a valid city', async () => {
      // Mock data
      const mockWeatherData = {
        name: 'London',
        main: { temp: 15 },
        weather: [{ main: 'Cloudy', icon: '04d' }],
        cod: 200,
      };

      const mockSetWeatherInStorage = jest.fn();
      const mockCallApi = jest.fn().mockResolvedValue(mockWeatherData);

      jest.mock('../src/service/weather', () => ({
        WeatherService: jest.fn().mockImplementation(() => ({
          formatCity: jest.fn(),
          callApi: mockCallApi,
        })),
      }));

      const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

      await act(() => {
        result.current.fetchWeather('London');
      });

      // Wait for async operation to complete
        await waitFor(() => expect(result.current.loading).toStrictEqual(false));

      // Verify final state
      expect(result.current.weatherData?.name).toEqual(mockWeatherData.name);
      expect(result.current.error).toBe('');
      expect(result.current.loading).toBe(false);
    });

    it('should return early without making API call when city name is empty', async () => {
      const mockSetWeatherInStorage = jest.fn();
      const mockCallApi = jest.fn();

      jest.mock('../src/service/weather', () => ({
        WeatherService: jest.fn().mockImplementation(() => ({
          formatCity: jest.fn(),
          callApi: mockCallApi,
        })),
      }));
      const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

      expect(result.current.loading).toBe(false);

      // Execute the fetch with empty city
      await act(async () => {
        await result.current.fetchWeather('');
      });

      expect(result.current.loading).toBe(false);
      expect(mockCallApi).not.toHaveBeenCalled();
      expect(result.current.error).toBe('');
      expect(result.current.weatherData).toBe(null);
    });
});
