export class UrlUtils {
    private getApiKey(): string {
        return '74437fa048d02f31f0c1d27882a2d231';
    }

    private getBaseUrl(): string {
        return 'https://api.openweathermap.org/data/2.5/weather';
    }

    public buildUrl(): string {
        const apikey: string = this.getApiKey();
        const baseUrl: string = this.getBaseUrl();
        return `${baseUrl}?q=___city___&appid=${apikey}&units=metric`;
    }
}
