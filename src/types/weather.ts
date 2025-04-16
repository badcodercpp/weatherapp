export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  cod: number;
  weather: {
    main: string;
    icon: string;
  }[];
}
