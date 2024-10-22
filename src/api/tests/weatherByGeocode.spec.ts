import { test, expect } from '@playwright/test';
import { WeatherApiHelper } from '../helpers/weatherApiHelper';
import locationsData from '../testData/testLocations.json';

test.describe('Weather API Tests', () => {
    let weatherApi: WeatherApiHelper;

    test.beforeEach(({ request }) => {
        weatherApi = new WeatherApiHelper(request);
    });
    
    for (const location of locationsData.locations) {
        test(`Get current weather for ${location.name}`, async () => {
            const response = await weatherApi.getCurrentWeather({
                lat: location.lat,
                lon: location.lon
            });
            
            expect(response.status()).toBe(200);
            const responseBody = await response.json();
            
            expect(responseBody).toHaveProperty('data');
            const weatherData = responseBody.data[0];
            
            expect(weatherData).toHaveProperty('temp');
            expect(weatherData).toHaveProperty('wind_spd');
            expect(weatherData).toHaveProperty('wind_dir');
            expect(weatherData).toHaveProperty('weather');
            expect(typeof weatherData.temp).toBe('number');
        });
    }
    
    test('Invalid API key test', async () => {
        const response = await weatherApi.getInvalidKeyWeather({
            lat: -33.865143,
            lon: 151.209900
        });
        
        expect(response.status()).toBe(403);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
    });
    
    test('Invalid coordinates test', async () => {
        const response = await weatherApi.getCurrentWeather({
            lat: 999,
            lon: 999
        })
        expect(response.status()).toBe(400);
    });
});