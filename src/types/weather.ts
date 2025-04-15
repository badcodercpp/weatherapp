export interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}
