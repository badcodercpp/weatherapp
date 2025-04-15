import { WeatherService } from '../src/service/weather';

describe('WeatherService', () => {

    it('should replace city placeholder with provided city name', () => {
      const weatherService = new WeatherService();
      const cityName = 'London';
      weatherService.formatCity(cityName);

      // Assert
      expect((weatherService as any).baseUrl).toContain('q=London');
      expect((weatherService as any).baseUrl).not.toContain('___city___');
    });

    it('should replace city placeholder with empty string when empty string is provided', () => {
      const weatherService = new WeatherService();
      const emptyCity = '';
      weatherService.formatCity(emptyCity);

      // Assert
      expect((weatherService as any).baseUrl).toContain('q=&appid=');
      expect((weatherService as any).baseUrl).not.toContain('___city___');
    });
});
