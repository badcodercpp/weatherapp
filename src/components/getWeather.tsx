import { ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { FC, useContext, useState } from 'react';
import { darkTheme, lightTheme } from '../theme';

//@ts-ignore
import RadioForm from 'react-native-simple-radio-button';
import { TTheme } from '../types/theme';
import { ThemeContext } from '../state';
import { ThemeEnum } from '../enums';
import { WeatherData } from '../types/weather';
import { useWeather } from '../hooks/useWeather';

interface GetWeatherProps {
    setWeatherInStorage: (data: WeatherData) => Promise<void>;
    setThemeValue: React.Dispatch<React.SetStateAction<ThemeEnum>>
}
const radio_props = [
    {label: 'light', value: 0 },
    {label: 'dark', value: 1 },
];

const GetWeather: FC<GetWeatherProps> = ({setWeatherInStorage, setThemeValue}) => {
    const [city, setCity] = useState('');
    const { weatherData, error, loading, fetchWeather } = useWeather(setWeatherInStorage);
    const theme = useContext(ThemeContext);

    const handleSearch = () => {
        fetchWeather(city);
    };

    const styles = createStyle(theme === ThemeEnum.LIGHT ? lightTheme : darkTheme);

    return (
        <View style={styles.container}>
            <View style={styles.themeContainer}>
            <Text style={styles.title}>Theme</Text>
                <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    onPress={(value: number) => {
                        value === 0 ? setThemeValue(ThemeEnum.LIGHT) : setThemeValue(ThemeEnum.DARK);
                        console.log(value);
                    }}
                    formHorizontal
                />
            </View>
            <Text style={styles.title}>Weather App</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
            />
            <Button title="Get Weather" onPress={handleSearch} />
            {loading && <ActivityIndicator style={styles.indicator} />}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {weatherData && (
                <View style={styles.card}>
                    <Text style={styles.city}>{weatherData.name}</Text>
                    <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
                    <Text style={styles.condition}>{weatherData.weather[0].main}</Text>
                    <Image
                        style={styles.icon}
                        source={{
                            uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const createStyle = (theme?: TTheme) => StyleSheet.create({
    indicator: { marginTop: 20 },
    themeContainer: {flexDirection: 'row'},
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
        backgroundColor: theme?.background ?? '#f5f5f5',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: theme?.inputBorder ?? '#ccc',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    card: {
        backgroundColor: theme?.card ?? '#fff',
        padding: 20,
        borderRadius: 15,
        marginTop: 20,
        alignItems: 'center',
        elevation: 3,
    },
    city: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    temp: {
        fontSize: 48,
        marginVertical: 10,
    },
    condition: {
        fontSize: 20,
        marginBottom: 10,
    },
    icon: {
        width: 100,
        height: 100,
    },
    error: {
        color: 'red',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default GetWeather;
