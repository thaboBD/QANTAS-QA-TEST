import { test, expect } from '@playwright/test';
import { WeatherApiHelper } from '../helpers/weatherApiHelper';

test.describe('Weather API Postal Code Tests', () => {
    let weatherApi: WeatherApiHelper;

    test.beforeEach(({ request }) => {
        weatherApi = new WeatherApiHelper(request);
    });

    test('Get current weather for valid postal code 2127', async () => {
        const response = await weatherApi.getCurrentWeatherByPostalCode('2127');
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        expect(responseBody).toHaveProperty('data');
        const weatherData = responseBody.data[0];
        
        expect(weatherData).toHaveProperty('temp');
        expect(weatherData).toHaveProperty('wind_spd');
        expect(weatherData).toHaveProperty('wind_dir');
        expect(weatherData).toHaveProperty('weather');
        expect(typeof weatherData.temp).toBe('number');
        
        expect(weatherData).toHaveProperty('city_name');
        expect(weatherData).toHaveProperty('country_code', 'AU');
    });

    test('Get weather for invalid postal code format', async () => {
        const response = await weatherApi.getCurrentWeatherByInvalidPostalCode('999999');
        
        expect(response.status()).toBe(200);
    });

    test('Get weather for non-existent postal code', async () => {
        const response = await weatherApi.getCurrentWeatherByInvalidPostalCode('0000');
        
        expect(response.status()).toBe(200);
    });

    test('Get weather for empty postal code', async () => {
        const response = await weatherApi.getCurrentWeatherByPostalCode('');
        
        expect(response.status()).toBe(400);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('error');
    });

    test('Validate specific weather data for postal code 2127', async () => {
        const response = await weatherApi.getCurrentWeatherByPostalCode('2127');
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const weatherData = responseBody.data[0];

        expect(typeof weatherData.temp).toBe('number');
        expect(typeof weatherData.wind_spd).toBe('number');
    });
});