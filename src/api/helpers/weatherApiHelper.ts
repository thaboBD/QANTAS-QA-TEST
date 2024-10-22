import { BaseApiHelper } from './baseApiHelper';
import { config } from '../../../config/environments';
import { APIResponse } from '@playwright/test';

// Define interfaces for different parameter types
interface CoordinatesParams {
    lat: number;
    lon: number;
}

interface PostalCodeParams {
    postal_code: string;
}

export class WeatherApiHelper extends BaseApiHelper {

    /**
     * makes a request to the weather API to get the current weather
     * @param params coordinates parameters
     * @returns 
     */
    async getCurrentWeather(params: CoordinatesParams): Promise<APIResponse> {
        return this.get('/current', {
            ...params,
            key: config.weatherApi.key
        });
    }

    /**
     * makes a request to the weather API to get the current weather with an invalid key
     * @param params coordinates parameters
     * @returns 
     */
    async getInvalidKeyWeather(params: CoordinatesParams): Promise<APIResponse> {
        return this.get('/current', {
            ...params,
            key: 'invalid_key'
        });
    }

    async getCurrentWeatherByPostalCode(postalCode: string): Promise<APIResponse> {
        return this.get('/current', {
            postal_code: postalCode,
            key: config.weatherApi.key
        });
    }

    async getCurrentWeatherByInvalidPostalCode(postalCode: string): Promise<APIResponse> {
        return this.get('/current', {
            postal_code: postalCode,
            key: config.weatherApi.key
        });
    }
    
}
