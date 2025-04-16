import { UrlUtils } from '../utils/urlUtils';
import { WeatherData } from '../types/weather';

export class WeatherService {
    private baseUrl: string = '';

    constructor() {
        const urlUtil = new UrlUtils();
        this.baseUrl = urlUtil.buildUrl();
    }

    formatCity(cityName: string): void {
        this.baseUrl = this.baseUrl.replace('___city___', cityName);
    }

    async callApi(): Promise<WeatherData> {
        const res = await fetch(this.baseUrl);
        const data = await res.json();
        return data;
    }
}
