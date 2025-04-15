import { fireEvent, render, waitFor } from '@testing-library/react-native';

import GetWeather from '../src/components/getWeather';
import { Text as MockText } from 'react-native';
import React from 'react';
import { ThemeContext } from '../src/state';
import { ThemeEnum } from '../src/enums';
import { WeatherData } from '../src/types/weather';

jest.mock('react-native-simple-radio-button', () => ({
  __esModule: true,
  default: ({ radio_props, onPress }: any) => {
    return radio_props.map((prop: any, index: number) => (
      <MockText key={index} onPress={() => onPress(prop.value)} testID={`radio-${prop.label}`}>
        {prop.label}
      </MockText>
    ));
  },
}));

jest.mock('../src/hooks/useWeather', () => ({
  useWeather: (_setWeatherInStorage: (data: WeatherData) => Promise<void>) => ({
    weatherData: {
      name: 'Test City',
      main: { temp: 22 },
      weather: [{ main: 'Sunny', icon: '01d' }],
    },
    error: '',
    loading: false,
    fetchWeather: jest.fn(),
  }),
}));

describe('GetWeather component', () => {
  const setWeatherInStorage = jest.fn();
  const setThemeValue = jest.fn();

  const renderComponent = (theme = ThemeEnum.LIGHT) =>
    render(
      <ThemeContext.Provider value={theme}>
        <GetWeather setWeatherInStorage={setWeatherInStorage} setThemeValue={setThemeValue} />
      </ThemeContext.Provider>
    );

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText('Weather App')).toBeTruthy();
    expect(getByPlaceholderText('Enter city name')).toBeTruthy();
    expect(getByText('Get Weather')).toBeTruthy();
  });

  it('calls fetchWeather on button press', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    const input = getByPlaceholderText('Enter city name');
    fireEvent.changeText(input, 'London');

    fireEvent.press(getByText('Get Weather'));

    await waitFor(() => {
      expect(input.props.value).toBe('London');
    });
  });

  it('renders weather card with data', () => {
    const { getByText } = renderComponent();

    expect(getByText('Test City')).toBeTruthy();
    expect(getByText('22°C')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
  });

  it('switches theme via radio buttons', () => {
    const { getByTestId } = renderComponent();

    fireEvent.press(getByTestId('radio-dark'));
    expect(setThemeValue).toHaveBeenCalledWith(ThemeEnum.DARK);
  });
});
