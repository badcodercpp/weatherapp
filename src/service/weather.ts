const API_KEY = '74437fa048d02f31f0c1d27882a2d231';

export class WeatherService {
    private baseUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=___city___&appid=${API_KEY}&units=metric`;

    formatCity(cityName: string) {
        this.baseUrl = this.baseUrl.replace('___city___', cityName);
    }

    async callApi() {
        const res = await fetch(this.baseUrl);
        const data = await res.json();
        return data;
    }
}
