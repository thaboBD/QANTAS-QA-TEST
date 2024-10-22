import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseApiHelper {
    constructor(
        protected request: APIRequestContext,
        protected baseApiPath: string = '/v2.0'
    ) {}

    /**
     * Makes a GET request to the API
     * @param endpoint the endpoint to hit
     * @param params query parameters
     * @param headers request headers
     */
    protected async get(endpoint: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders = {
            'Accept': 'application/json',
        };

        const mergedHeaders = {
            ...defaultHeaders,
            ...headers
        };

        return this.request.get(`${this.baseApiPath}${endpoint}`, {
            params,
            headers: mergedHeaders
        });
    }

    /**
     * Makes a POST request to the API
     * @param endpoint the endpoint to hit
     * @param params query parameters
     * @param headers request headers
     */
    protected async post(endpoint: string, data?: any, headers?: Record<string, string>): Promise<APIResponse> {
        const defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const mergedHeaders = {
            ...defaultHeaders,
            ...headers
        };

        return this.request.post(`${this.baseApiPath}${endpoint}`, {
            data,
            headers: mergedHeaders
        });
    }

    
}