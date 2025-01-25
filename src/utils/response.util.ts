// src/utils/response.ts

import { Response } from 'express';

/**
 * Custom response shape
 */
export interface CustomResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: any;
}

/**
 * Send a success response
 * @param res Express Response
 * @param data Response payload
 * @param message Optional message
 * @param code HTTP status code (default 200)
 */
export function successResponse<T>(
    res: Response,
    data: T,
    message = 'Success',
    code = 200
): Response {
    const responseBody: CustomResponse<T> = {
        success: true,
        message,
        data,
    };
    return res.status(code).json(responseBody);
}

/**
 * Send an error response
 * @param res Express Response
 * @param message Error message
 * @param code HTTP status code (default 500)
 * @param errors Optional error details
 */
export function errorResponse(
    res: Response,
    message = 'Error',
    code = 500,
    errors?: any
): Response {
    const responseBody: CustomResponse = {
        success: false,
        message,
        errors,
    };
    return res.status(code).json(responseBody);
}
