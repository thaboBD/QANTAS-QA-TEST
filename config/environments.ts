import dotenv from 'dotenv';
dotenv.config();

export const config = {
    weatherApi: {
        key: process.env.WEATHER_API_KEY || '',
        baseUrl: 'https://api.weatherbit.io'
    }
};